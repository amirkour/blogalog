
class Blogalog < Sinatra::Base
	set :sessions, true

	register Sinatra::JSON
	
	configure :development do
		register Sinatra::Reloader
		Mongooz.defaults :db=>"blogalog_test"
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
