import bcrypt

class Hash:
    @staticmethod
    def bcrypt(password: str):
        # Convert password to bytes and hash it
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password_bytes, salt)
        return hashed.decode('utf-8')

    @staticmethod
    def verify(hashed_password: str, plain_password: str):
        # Convert both to bytes and verify
        password_bytes = plain_password.encode('utf-8')
        hashed_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed_bytes)
