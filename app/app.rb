class Blogalog < Sinatra::Base

	before '/entries**' do
		halt(401, "no thanks!") unless logged_in?
		@creating=true
	end
	get '/entries/new' do
		all_tag_objects=Tag.db_query || []
		all_tags=all_tag_objects.map{|tag| tag[:tag]}

		haml :"entries/new", :locals=>{:all_tags=>all_tags}
	end
	post '/entries' do
		title=request[:title] || ''
		body=request[:body] || ''
		tags=request[:tags] || []
		
		halt 400, json({:error=>"Missing required title"}) unless title.length > 0
		halt 400, json({:error=>"Missing required body"}) unless body.length > 0
		new_entry=Entry.new
		new_entry[:title]=title
		new_entry[:body]=body
		new_entry[:tags]=tags

		begin
			new_entry.db_insert
		rescue Exception => e
			halt 500, json({:error=>"Failed to insert w/ the following error: #{e.message}"})
		end

		json(new_entry)
	end
	put '/entries' do
		halt 500, json({:error=>"Unimplemented entry update"})
	end

	get "/" do

		# mongooz is too dumb to do all the sorting and junk ... gotta do it myself. fail.
		mongooz_opts=Entry.set_db_options Mongooz.defaults
		result=nil
		begin
			Mongooz::Base.collection(mongooz_opts) do |col|
				entries=col.find().sort({:created_at=>-1}).limit(1)
				raise "Got no entries from sorted query" unless entries
				raise "Expected 1 result and got #{entries.count} instead" unless entries.count(true)==1
				result=Entry.typified_result_hash_or_nil entries.next
			end
		rescue Exception=>e
			result=Entry.typified_result_hash_or_nil({:title=>'There was an error retrieving the first blog entry!?',:body=>e.message})
		end

		haml :index, :locals=>{:initial_entry=>result}
	end

	helpers do
		def logged_in?
			#todo
			true
		end
	end
end
