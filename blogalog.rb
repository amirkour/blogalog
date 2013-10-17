require 'bundler'
Bundler.setup(:default)
require 'time'
require 'haml'
require 'json'
require 'pry'
require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/reloader'
require 'omniauth-google-oauth2'
require 'omniauth-facebook'
require 'mongooz'

require_relative 'app/init.rb'

class Blogalog < Sinatra::Base
	set :app_file, __FILE__
end
