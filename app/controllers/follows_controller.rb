class FollowsController < ApplicationController

  def index    
    @followers = Follow.where(follower_id: params[:user_id])  
    user_and_follows = [params[:user_id]]  
    for i in @followers do
      user_and_follows.append(i.followed_id)
    end
    
    @total = User.all
    users_to_follow = Array.new
    for i in @total do
      users_to_follow.append(i.id)
    end

    for j in user_and_follows do
      users_to_follow.delete(j.to_i)
    end
    
    @users = User.where(id: users_to_follow)
    
    already_followed_users = Array.new
    for i in @total do
      already_followed_users.append(i.id)
    end
    
    for j in users_to_follow do
      already_followed_users.delete(j.to_i)
    end
    already_followed_users.delete(params[:user_id].to_i)

    @follows = User.where(id: already_followed_users) 
  end


  def create
    @user = User.find(params[:user_id])
    puts @user.id
    @follow = Follow.create(follow_params)
    @follow.follower_id = @user.id
    @follow.save
    redirect_to user_path(@user)
  end

  def new
  end



  private
  def follow_params
    params.require(:follow).permit(:followed_id)
  end
end
