class Blogalog < Sinatra::Base

	get "/" do
		haml :index
	end
end
