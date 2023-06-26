mod models;
mod repositories;
mod routes;
use actix_web::{web, App, HttpServer};
use routes::index;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Start http server
    let product_repository = repositories::ProductRepository::new("products.json".to_string());
    let category_repository = repositories::CategoryRepository::new("categories.json".to_string());

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(product_repository.clone()))
            .app_data(web::Data::new(category_repository.clone()))
            .service(index)
            .service(routes::products)
            .service(routes::product)
            .service(routes::categories)
            .service(routes::category)
    })
    .bind("127.0.0.1:8001")?
    .run()
    .await
}
