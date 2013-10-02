class Blogalog < Sinatra::Base

	get "/" do

		# TODO - the query should retrieve the first entry sorted by date descending
		entries=Entry.db_get_paged
		initial_entry=entries && entries.count > 0 ? entries[0] : nil

		haml :index, :locals=>{:initial_entry=>initial_entry}
	end

end
