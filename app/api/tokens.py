from flask import jsonify, g
from app import db
from app.api import bp
from app.api.auth import basic_auth
from app.api.auth import token_auth
from app.models import User


@bp.route('/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    username = basic_auth.username()
    user = User.query.filter_by(username=username).first()
    token = g.current_user.get_token()
    db.session.commit()
    return jsonify({'token': token, 'id': user.id})


@bp.route('/tokens', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    g.current_user.revoke_token()
    db.session.commit()
    return '', 204