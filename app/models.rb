
class Tag<Mongooz::MongoozHash; end
class Entry<Mongooz::MongoozHash
	class << self
		def from_request_params(params=nil)
			return nil unless params.kind_of?(Hash)
			new_entry=Entry.new
			
			# leave the _id param off if it's not in the param hash,
			# otherwise you might end up trying to store a hash in mongo
			# with _id=nil
			if params[:_id] && params[:_id].length>0
				new_entry[:_id]=params[:_id]
			end

			new_entry[:title]=params[:title] && params[:title].length>0 ? params[:title] : nil
			new_entry[:body]=params[:body] && params[:body].length>0 ? params[:body] : nil
			new_entry[:tags]=params[:tags]
			new_entry
		end
	end

	def db_insert(options={})
		self[:created_at]=Time.now
		super(options)
	end
end
