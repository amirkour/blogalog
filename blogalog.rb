require 'bundler'
Bundler.setup(:default)
require 'haml'
require 'json'
require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/reloader'
require 'mongooz'

require_relative 'app/init.rb'

class Blogalog < Sinatra::Base
	set :app_file, __FILE__
end
