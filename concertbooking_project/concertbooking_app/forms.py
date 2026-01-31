from django import forms
from .models import Concert,User

class ConcertForm(forms.ModelForm):
    class Meta:
        model = Concert
        fields = ['name', 'date_time', 'venue', 'ticket_price', 'available_tickets', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Concert Name', 'class': 'form-control'}),
            # 'artists': forms.TextInput(attrs={'placeholder': 'Artists Name', 'class': 'form-control'}),
            # 'category': forms.TextInput(attrs={'placeholder': 'Concert Category', 'class': 'form-control'}),
            'venue': forms.TextInput(attrs={'placeholder': 'Venue', 'class': 'form-control'}),
            'date_time': forms.DateTimeInput(attrs={
                'type': 'datetime-local', 'class': 'form-control'
            }),
            # 'total_tickets': forms.NumberInput(attrs={'placeholder': 'Total Tickets', 'class': 'form-control'}),
            'ticket_price': forms.NumberInput(attrs={'placeholder': 'Price of Ticket', 'class': 'form-control'}),
            'image': forms.FileInput(attrs={'class': 'form-control-file'}),
        }
       
# class BookingForm(forms.ModelForm):
#     class Meta:
#         model = Booking
#         fields = ['concert', 'tickets']
        
class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name','email','password'] 
       
