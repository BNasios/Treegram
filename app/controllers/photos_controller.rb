class PhotosController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    if params[:photo] == nil
      flash[:alert] = "Please upload a photo"
      redirect_to :back
    else
    @photo = Photo.create(photo_params)
      @photo.user_id = @user.id
      if(@photo.save)
        flash[:notice] = "Successfully uploaded a photo"
        redirect_to user_path(@user)
      else
        render 'new'
      end
    end
  end

  def new
    @photo = Photo.new
  end

  def destroy 
    if request.xhr?
      @user = User.find(params[:user_id])
      @photo = Photo.find(params[:id])
      @photo.destroy
      redirect_to user_path(@user)
    end

  end

  private
  def photo_params
    params.require(:photo).permit(:image,:title)
  end
end
