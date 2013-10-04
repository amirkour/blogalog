
class Tag<Mongooz::MongoozHash; end
class Entry<Mongooz::MongoozHash
	alias_method :old_db_insert, :db_insert
	def db_insert(options={})
		self[:created_at]=Time.now
		old_db_insert(options)
	end
end
