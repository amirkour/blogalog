class Blogalog < Sinatra::Base

	before '/entries**' do
		halt(401, "no thanks!") unless logged_in?
		@creating=true
	end
	get '/entries/new' do
		all_tags_and_their_counts=Entry.distinct_tags || []
		all_tags=all_tags_and_their_counts.map{|tag_with_count| tag_with_count['_id']}

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
		tag_name=params[:name]
		json(Entry.entries_for_tag(tag_name))
	end

	get "/" do
		result=Entry.latest
		haml :index, :locals=>{:initial_entry=>result}
	end

	helpers do
		def logged_in?
			#todo
			true
		end
	end
end
