
class Blogalog < Sinatra::Base
	get '/auth/:provider/callback' do

		provider=params[:provider]
		halt 500, "Missing required provider request param" unless provider
		# logger.info("The provider in the callberk is #{provider}")

		auth_hash=request.env['omniauth.auth']
		# halt 500, "Missing required omniauth.auth env request param" unless auth_hash
		# logger.info(auth_hash)

		# logger.info("Credentials are:")
		# logger.info(auth_hash[:credentials])
		# logger.info("Info hash:")
		# logger.info(auth_hash[:info])

		bear_minimum_info_hash=get_relevant_oauth_info(provider, auth_hash)
		store_logged_in_user_info_in_session(bear_minimum_info_hash)

		redirect to("/#authorized")
	end

	get '/auth/failure' do
		logger.error("auth failed/denied")
		halt 500, "Auth failed in your own home!?"
	end

	private
	def get_relevant_oauth_info(provider, auth_hash)
		return nil unless provider && auth_hash

		case provider
		when 'facebook', 'google_oauth2'
			info_hash=auth_hash[:info]
			return nil unless info_hash

			name=info_hash[:name]
			image_url=info_hash[:image]
			return nil unless name && image_url
			{:name=>name, :image_url=>image_url}
		else
			nil
		end
	end
end
