class Blogalog < Sinatra::Base

	get '/entries/new' do
		haml :"entries/new"
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
