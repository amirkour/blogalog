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

		# TODO - the query should retrieve the first entry sorted by date descending
		entries=Entry.db_get_paged
		@initial_entry=entries && entries.count > 0 ? entries[0] : nil

		haml :index
	end

	helpers do
		def logged_in?
			#todo
			true
		end
	end
end
