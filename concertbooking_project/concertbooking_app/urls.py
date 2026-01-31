from django.urls import path
from .import views
    
urlpatterns = [
    path("admin-dashboard/",views.concert_list,name="concert_list"),
    path("add/",views.add_concert,name="add_concert"),
    path('edit/<int:id>/', views.edit_concert, name='edit_concert'),
    path('delete/<int:id>/', views.delete_concert, name='delete_concert'),
    path('register/',views.register,name='register'),
    # path('token/',views.login_view,name='token'),
    path('login/',views.login_view,name='login'),
    # path('logout/', views.logout_view, name='custom_logout'),

    path('concerts/',views.concert_list_api,name='concerts'),
    path('concerts/<int:pk>/',views.concert_detail_view, name='concert-detail'),
    path("book-ticket/", views.book_concert_ticket, name="book-ticket"),
    path('my-bookings/',views.my_bookings, name='my-bookings'),
    path("make-payment/", views.make_payment, name="make-payment"),
    path("create-session/", views.create_django_session),
    
   
]

