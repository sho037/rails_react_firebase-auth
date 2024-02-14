require "firebase_authenticator.rb"

class V1::UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create]

  def create
    token = request.headers['Authorization']&.split('Bearer ')&.last
    return render json: { status: "error", error: 'Unauthorized' }, status: :unauthorized unless token

    begin
      payload = FirebaseAuthenticator.new(token).validate!
      @user = User.find_or_create_by(uid: payload['sub']) do |user|
        user.nickname = user_params[:nickname]
      end
    rescue FirebaseAuthenticator::InvalidTokenError => e
      return render json: { error: e.message }, status: :unauthorized
    end

    render json: { status: "success", user: @user }
  end

  private

  def user_params
    params.require(:user).permit(:nickname)
  end

end
