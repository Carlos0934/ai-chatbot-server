FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src


COPY *.csproj ./
RUN dotnet restore

COPY . .


RUN dotnet build -c Release -o /app/build


FROM build AS publish
RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8002
ENTRYPOINT ["dotnet", "ShoppingCartApi.dll"]
