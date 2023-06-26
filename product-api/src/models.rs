use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Product {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image: String,
    pub price: f32,
}

#[derive(Serialize, Deserialize)]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub description: String,
}
