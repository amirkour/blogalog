
class Blogalog < Sinatra::Base
	set :sessions, true
	register Sinatra::JSON
	
	configure :development do
		set :logging=>true
		# set :ssl_port=>443#todo - config to something else in dev? would have to setup webrick to handle it
		
		register Sinatra::Reloader
		Mongooz.defaults :db=>"blogalog_test"

		fb_key=ENV['FB_KEY_BLOGALOG']
		fb_secret=ENV['FB_SECRET_BLOGALOG']
		raise "Missing required FB_KEY_BLOGALOG and/or FB_SECRET_BLOGALOG environment variables" unless fb_key && fb_secret

		google_key=ENV['GOOGLE_KEY_BLOGALOG']
		google_secret=ENV['GOOGLE_SECRET_BLOGALOG']
		raise "Missing required GOOGLE_KEY_BLOGALOG and/or GOOGLE_SECRET_BLOGALOG environment variables" unless google_key && google_secret

		use OmniAuth::Builder do
			provider :google_oauth2, google_key, google_secret
			provider :facebook, fb_key, fb_secret
		end
	end

	configure :production do

		# todo - prod setup once on heroku!
		# connection_string=ENV['MONGOHQ_URL']
		# raise "Missing required MONGOHQ_URL env variable for db connection" unless connection_string
		# puts "Connecting to mongohq via #{connection_string}"

  # 		connection_uri = URI.parse(connection_string)
  # 		db_name = connection_uri.path.gsub(/^\//, '')
  # 		db_host=connection_uri.host
  # 		db_port=connection_uri.port
  # 		db_user=connection_uri.user
  # 		db_password=connection_uri.password
  # 		Mongooz.defaults :host=>db_host, :port=>db_port, :db=>db_name, :user=>db_user, :password=>db_password
	end


end
