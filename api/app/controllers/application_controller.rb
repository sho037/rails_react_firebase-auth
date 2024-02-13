require "firebase_authenticator.rb"

class ApplicationController < ActionController::API
  before_action :authenticate

  def authenticate
    token = request.headers['Authorization']&.split('Bearer ')&.last
    return render json: { status: "error", error: 'Unauthorized' }, status: :unauthorized unless token

    begin
      payload = FirebaseAuthenticator.new(token).validate!
      @current_user = User.find_by(uid: payload['sub'])
    rescue FirebaseAuthenticator::InvalidTokenError => e
      return render json: { status: "error", error: e.message }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def logged_in?
    !!@current_user
  end
end
