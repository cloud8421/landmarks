require 'sinatra'
require 'dotenv'

Dotenv.load

RACK_ENV ||= 'development'

class Landmarks < Sinatra::Base

  configure do
    set :root, File.dirname(__FILE__)
  end

  get '/' do
    erb :index
  end
end
