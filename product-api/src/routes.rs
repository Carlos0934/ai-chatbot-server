use crate::{models::Product, repositories};
use actix_web::{get, web, HttpResponse, Responder};

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().json(Product {
        id: 1,
        name: "Rust".to_string(),
        description: "Awesome programming language".to_string(),
        image: "https://www.rust-lang.org/logos/rust-logo-512x512.png".to_string(),
        price: 0.0,
    })
}

#[get("/products")]
async fn products(repository: web::Data<repositories::ProductRepository>) -> impl Responder {
    let products = repository.get_products();
    HttpResponse::Ok().json(products)
}

#[get("/products/{id}")]
async fn product(
    repository: web::Data<repositories::ProductRepository>,
    id: web::Path<i32>,
) -> impl Responder {
    let product = repository.get_product(&id);
    match product {
        Some(p) => HttpResponse::Ok().json(p),
        None => HttpResponse::NotFound().body("Not found"),
    }
}

#[get("/categories")]
async fn categories(repository: web::Data<repositories::CategoryRepository>) -> impl Responder {
    let categories = repository.get_categories();
    HttpResponse::Ok().json(categories)
}

#[get("/categories/{id}")]
async fn category(
    repository: web::Data<repositories::CategoryRepository>,
    id: web::Path<i32>,
) -> impl Responder {
    let category = repository.get_category(&id);
    match category {
        Some(c) => HttpResponse::Ok().json(c),
        None => HttpResponse::NotFound().body("Not found"),
    }
}
