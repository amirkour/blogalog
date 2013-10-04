class Blogalog < Sinatra::Base

	before '/entries*/*' do
		halt(401, "no thanks!") unless logged_in?
		@creating=true
	end
	get '/entries/new' do
		all_tag_objects=Tag.db_query || []
		all_tags=all_tag_objects.map{|tag| tag[:tag]}

		haml :"entries/new", :locals=>{:all_tags=>all_tags}
	end
	post '/entries' do
		sleep(1)
		halt 500, json({:error=>"Unimplemented entry creation"})
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
