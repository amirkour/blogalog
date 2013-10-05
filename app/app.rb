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
		new_entry=Entry.from_request_params(params)
		
		halt 500, json({:error=>"Failed to retrieve new entry from request params!?"}) unless new_entry
		halt 400, json({:error=>"Missing required title"}) unless new_entry[:title]
		halt 400, json({:error=>"Missing required body"}) unless new_entry[:body]

		begin
			new_entry.db_insert
		rescue Exception => e
			halt 500, json({:error=>"Failed to insert w/ the following error: #{e.message}"})
		end

		json(new_entry)
	end
	put '/entries' do
		entry_to_update=Entry.from_request_params(params)

		halt 500, json({:error=>"Failed to retrieve new entry from request params!?"}) unless entry_to_update
		halt 400, json({:error=>"Missing required title"}) unless entry_to_update[:title]
		halt 400, json({:error=>"Missing required body"}) unless entry_to_update[:body]

		begin
			entry_to_update.db_update
		rescue Exception => e
			halt 500, json({:error=>"Failed to update w/ the following error: #{e.message}"})
		end

		json(entry_to_update)
	end

	get "/tags" do
		json(Entry.distinct_tags)
	end
	get "/tags/:name" do
		raise "not implemented"
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
