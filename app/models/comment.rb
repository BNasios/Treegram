class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :photo
  
  validates :text, length: {minimum: 1} 
end
