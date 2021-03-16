class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.valid?
    if !@user.is_email?
      flash[:alert] = "Input a properly formatted email."
      redirect_to :back
    elsif @user.errors.messages[:email] != nil
      flash[:notice]= "That email " + @user.errors.messages[:email].first
      redirect_to :back
    elsif @user.save
      flash[:notice]= "Signup successful. Welcome to the site!"
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      flash[:alert] = "There was a problem creating your account. Please try again."
      redirect_to :back
    end
  end

  def new
    @user = User.new
  end

  def show
    
    @followers = Follow.where(follower_id: params[:id])
    @users = User.all

    user_and_follows = [params[:id]]  
    for i in @followers do
      user_and_follows.append(i.followed_id)
    end
    @us = User.where(id: user_and_follows)
    @user = User.find(params[:id])
    @tag = Tag.new
    

    if request.xhr?
      x = params.to_s.split("=")[0]
      x2 = x[2..-2].split("/")

      #@photo = find photo by id. This is to find the photo comments.
      @photo = Photo.find(x2[1])
      render(:partial => 'comments', :object => @user)
    end

  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :avatar)
  end

end
