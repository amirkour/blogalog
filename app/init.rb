# order matters!

# config first
require_relative 'config.rb'

# then models
require_relative 'models.rb'

# auth routes
require_relative 'auth.rb'

# main routes
require_relative 'app.rb'