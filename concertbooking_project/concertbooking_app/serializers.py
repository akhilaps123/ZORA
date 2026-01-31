from rest_framework import serializers
from .models import Concert,Booking
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ConcertSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField() 
    
    class Meta:
        model = Concert
        fields = '__all__'

    def get_image(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url)
        return None

class BookingSerializer(serializers.ModelSerializer):
    concert = ConcertSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = "__all__"

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_staff'] = user.is_staff
        return token
