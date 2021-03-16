class CommentsController < ApplicationController

  def index
  end

  def new
    @comment = Comment.new
  end

  def show
  end

  def create
    if request.xhr?
      @user = User.find(params[:user_id])
      @photo = Photo.find(params[:photo_id])
      @comment = Comment.create({"user_id"=>params[:user_id], "photo_id"=>params[:photo_id], "text"=>params[:data]})
      (render :partial => 'users/comments', :object => @photo)
    end


  end

  def destroy
  end

  
end
