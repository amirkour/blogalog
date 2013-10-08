
# class Tag<Mongooz::MongoozHash

# end
class Entry<Mongooz::MongoozHash
	class << self
		def from_request_params(params=nil)
			return nil unless params.kind_of?(Hash)
			new_entry=Entry.new
			
			# leave the _id param off if it's not in the param hash,
			# otherwise you might end up trying to store a hash in mongo
			# with _id=nil
			if params[:_id]

				# the id goes in and out of the web tier looking like this:
				# {:'$oid'=>'big fat bson string'}
				new_entry_id_hash=params[:_id]
				raise "Expected _id of entry to be a hash" unless new_entry_id_hash.kind_of?(Hash)
				raise "Expected _id hash of entry to have an $oid key" unless new_entry_id_hash[:'$oid']
				new_entry[:_id]=BSON.ObjectId(new_entry_id_hash[:'$oid'])
			end
			
			if params[:created_at].kind_of?(String)
				new_entry[:created_at]=Time.iso8601(params[:created_at]).utc
			else
				new_entry[:created_at]=Time.now.utc
			end

			new_entry[:title]=params[:title] && params[:title].length>0 ? params[:title] : nil
			new_entry[:body]=params[:body] && params[:body].length>0 ? params[:body] : nil
			new_entry[:tags]=params[:tags]

			new_entry
		end
		def distinct_tags
			options=set_db_options({})
			tags=nil

			pipe_one={"$unwind"=>"$tags"}
			pipe_two={"$group"=>{"_id"=>"$tags", "entries"=>{"$sum"=>1}}}
			pipe_three={"$sort"=>{"_id"=>1}}
			Mongooz::Base.collection(options) do |col|
				# tags=col.distinct('tags')
				tags=col.aggregate([pipe_one, pipe_two, pipe_three])
			end

			tags || []
		end
		def latest
			options=set_db_options({})
			result=nil
			Mongooz::Base.collection(options) do |col|
				entries=col.find().sort({:created_at => -1}).limit(1)
				result=typified_result_hash_or_nil(entries.next) if entries and entries.count(true) == 1
			end
			
			result
		end
	end

	def db_insert(options={})
		self[:created_at]=Time.now.utc unless self[:created_at].kind_of?(Time)
		super(options)
	end
end
