from django.shortcuts import render, redirect, get_object_or_404
from django.db import models
from .models import Concert,Booking
from .forms import ConcertForm
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import ConcertSerializer,BookingSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Sum

from django.contrib.auth.decorators import user_passes_test,login_required
from .permissions import IsAdmin
from django.contrib.auth import login
from django.http import JsonResponse
from django.http import HttpResponseForbidden
# Decorator to allow only admin (staff) users
# def admin_required(view_func):
#     return user_passes_test(
#         lambda u: u.is_active and u.is_staff,
#         login_url='http://localhost:3000'  # Redirect non-admins to login page
#     )(view_func)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_django_session(request):
#     """
#     Converts JWT-authenticated user into Django session login
#     """
#     user = request.user

#     if not user.is_staff:
#         return Response(
#             {"error": "Not an admin"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     login(request, user)  # 🔥 creates Django session
#     return Response({"message": "Admin session created"})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_django_session(request):
    user = request.user
    login(request, user)  # creates Django session
    return JsonResponse({"message": "Session created"})





# ---------- ADMIN (HTML) ----------
# def is_admin(user):
#     return user.is_superuser
# @user_passes_test(is_admin)
# @admin_required
# @staff_member_required(login_url='http://localhost:3000')
# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdmin])



# @login_required(login_url="http://localhost:3000/")
# @user_passes_test(is_admin, login_url="http://localhost:3000/")
# @api_view(['GET'])
# @permission_classes([IsAuthenticated,IsAdminUser])
# def concert_list(request):
#     concerts = Concert.objects.all()
#     serializer = ConcertSerializer(concerts, many=True)
#     return Response(serializer.data)
    # return render(request, "concert_list.html", {"concerts": concerts})
def is_admin(user):
    return user.is_active and user.is_staff or user.is_superuser

#for admin
# @staff_member_required(login_url='http://localhost:3000')
@login_required(login_url="/admin/login/")
@user_passes_test(is_admin)
def concert_list(request):
    concerts = Concert.objects.all()
    return render(request, "concert_list.html", {"concerts": concerts})
    # serializer = ConcertSerializer(concerts, many=True, context={"request": request})
    # return Response(serializer.data)




# def concert_list(request):
#     concerts = Concert.objects.all()
#     return render(request, "concert_list.html", {"concerts": concerts})
# @admin_required
@login_required(login_url="/admin/login/")
@user_passes_test(is_admin)
def add_concert(request):
    if request.method == "POST":
        form = ConcertForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("concert_list")
    else:
        form = ConcertForm()
    return render(request, "add_concert.html", {"form": form})
# @admin_required
@login_required(login_url="/admin/login/")
@user_passes_test(is_admin)
def edit_concert(request, id):
    concert = get_object_or_404(Concert, id=id)
    form = ConcertForm(request.POST or None, request.FILES or None, instance=concert)
    if form.is_valid():
        form.save()
        return redirect("concert_list")
    return render(request, "add_concert.html", {"form": form})
# @admin_required
@login_required(login_url="/admin/login/")
@user_passes_test(is_admin)
def delete_concert(request, id):
    if request.method == "POST":
        concert = get_object_or_404(Concert, id=id)
        concert.delete()
    return redirect("concert_list")

@api_view(['GET']) 
@permission_classes([AllowAny])  # public access
def user_concert_list(request):
    concerts = Concert.objects.all()
    serializer = ConcertSerializer(concerts, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])  # <- anyone can view concert details
def concert_detail_view(request, pk):
    concert = get_object_or_404(Concert, pk=pk)
    serializer = ConcertSerializer(concert, context={'request': request})
    return Response(serializer.data)
        
@api_view(['POST'])
@permission_classes([AllowAny]) 
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get("password")
    if not username or not password:
          return Response(
              {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    # Default → normal user
    user.is_staff = False
    user.save()
    return Response(
          {"message": "User registered successfully",
          "username": user.username,
         "is_staff": user.is_staff},
         status=status.HTTP_201_CREATED
       )

@api_view(['POST'])
@permission_classes([AllowAny]) 
def login_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "is_staff": user.is_staff or user.is_superuser,
        "username": user.username,
        "email": user.email
    })

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def logout_view(request):
#     try:
#         refresh_token = request.data.get("refresh")
#         token = RefreshToken(refresh_token)
#         token.blacklist()
#         return Response({"message": "Logout Successful"}, status=status.HTTP_200_OK)
#     except Exception:
#         return Response({"error": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
# @api_view(['POST', 'GET']) # Supporting GET for simple redirects if needed
# @permission_classes([IsAuthenticated])
# def logout_view(request):
#     if request.method == 'POST':
#         try:
#             refresh_token = request.data.get("refresh")
#             if refresh_token:
#                 token = RefreshToken(refresh_token)
#                 token.blacklist()
#             return Response({"message": "Success"}, status=status.HTTP_200_OK)
#         except Exception:
#             return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    
#     # If accessed via GET, redirect to your login page
#     return redirect('login')

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def concert_list_api(request):
#     concerts = Concert.objects.all()
#     serializer = ConcertSerializer(concerts,many=True,context={"request": request})
#     return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def concert_list_api(request):
    concerts = Concert.objects.all()
    seerializer = ConcertSerializer(concert, context={'request': request})
    return Response(serializer.data)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_concert_ticket(request):
    """
    POST:
    {
        "concert_id": 1,
        "tickets": 2
    }
    """
    user = request.user
    concert_id = request.data.get("concert_id")
    tickets = request.data.get("tickets")

    if not concert_id or not tickets:
        return Response(
            {"error": "concert_id and tickets are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        tickets = int(tickets)
    except ValueError:
        return Response(
            {"error": "tickets must be a number"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if tickets <= 0:
        return Response(
            {"error": "tickets must be greater than 0"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        concert = Concert.objects.get(id=concert_id)
    except Concert.DoesNotExist:
        return Response(
            {"error": "Concert not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if concert.available_tickets < tickets:
        return Response(
            {"error": "Not enough tickets available"},
            status=status.HTTP_400_BAD_REQUEST
        )

    total_price = tickets * concert.ticket_price


    already_booked = Booking.objects.filter(
    user=user,
    concert=concert
    ).aggregate(total=Sum('tickets'))['total'] or 0

    if already_booked + tickets > 3:
        return Response(
            {"error": "You can book only 3 tickets for this concert"},
            status=status.HTTP_400_BAD_REQUEST
    )

    # Create booking
    booking = Booking.objects.create(
        user=request.user,
        concert=concert,
        tickets=tickets,
        total_price=total_price
    )

    # Reduce available tickets
    concert.available_tickets -= tickets
    concert.save()

    return Response(
        {
            "message": "Booking successful",
            "booking_id": booking.id,
            "concert": concert.name,
            "tickets": booking.tickets,
            "total_price": booking.total_price
        },
        status=status.HTTP_201_CREATED
    )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    serializer = BookingSerializer(
        bookings,
        many=True,
        context={'request': request}
    )
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_payment(request):
    booking_id = request.data.get("booking_id")
    if not booking_id:
        return Response(
            {"error": "booking_id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        booking = Booking.objects.get(id = booking_id,user = request.user)
    except Booking.DoesNotExist:
        return Response(
            {"error": "Booking not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    if booking.status == "PAID":
        return  Response(
            {"message": "Already paid"},
            status=status.HTTP_400_BAD_REQUEST
        )

     # ✅ Simulate payment success
    booking.status = "PAID"
    booking.save()
    return Response(
        {
            "message": "Payment successful",
            "booking_id": booking.id,
            "status": booking.status
        },
        status=status.HTTP_200_OK
    )




# ---------------- BOOKING APIs ----------------

# class BookingCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         concert_id = request.data.get("concert")

#         if not concert_id:
#             return Response(
#                 {"error": "concert id is required"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         concert = get_object_or_404(Concert, id=concert_id)

#         booking = Booking.objects.create(
#             user=request.user,
#             concert=concert
#         )

#         serializer = BookingSerializer(booking)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_booking(request):
#     concert_id = request.data.get("concert")
#     tickets = request.data.get("tickets")

#     if not concert_id or not tickets:
#         return Response(
#             {"error": "concert id and tickets are required"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     try:
#         concert = Concert.objects.get(id=concert_id)
#     except Concert.DoesNotExist:
#         return Response(
#             {"error": "Concert not found"},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     booking = Booking.objects.create(
#         user=request.user,
#         concert=concert,
#         tickets = tickets
#     )

#     return Response(
#         {
#             "message": "Booking created successfully",
#             "booking_id": booking.id,
#             "concert": concert.name,
#             "seats": booking.seats
#         },
#         status=status.HTTP_201_CREATED
#     )


# # class MyBookingsView(APIView):
# #     permission_classes = [IsAuthenticated]

# #     def get(self, request):
# #         bookings = Booking.objects.filter(user=request.user)
# #         serializer = BookingSerializer(bookings, many=True)
# #         return Response(serializer.data)
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def my_bookings(request):
#     bookings = Booking.objects.filter(user=request.user)
#     # serializer = BookingSerializer(bookings, many=True)
#     data = []
#     for booking in bookings:
#         data.append({
#             "id": booking.id,
#             "concert": booking.concert.name,
#             "venue": booking.concert.venue,
#             "seats": booking.seats,
#             "date": booking.booked_at
#         })

#     return Response(data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def make_payment(request):
#     booking_id = request.data.get("booking_id")

#     if not booking_id:
#         return Response(
#             {"error": "booking_id is required"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     try:
#         booking = Booking.objects.get(id=booking_id, user=request.user)
#     except Booking.DoesNotExist:
#         return Response(
#             {"error": "Booking not found"},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     amount = booking.concert.price * booking.seats

#     payment = Payment.objects.create(
#         booking=booking,
#         amount=amount,
#         status="SUCCESS"
#     )

#     return Response(
#         {
#             "message": "Payment successful",
#             "payment_id": payment.id,
#             "amount": payment.amount,
#             "status": payment.status
#         },
#         status=status.HTTP_201_CREATED
#     )
