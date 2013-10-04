
class Tag<Mongooz::MongoozHash; end
class Entry<Mongooz::MongoozHash
	def db_insert(options={})
		self[:created_at]=Time.now
		super(options)
	end
end
