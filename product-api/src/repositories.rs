use crate::models::{Category, Product};
use std::fs::File;
use std::io::BufReader;

#[derive(Clone)]
struct JsonRepository {
    file_path: String,
}

impl JsonRepository {
    pub fn new(file_path: String) -> JsonRepository {
        JsonRepository { file_path }
    }

    fn read_json<T>(&self) -> Vec<T>
    where
        T: serde::de::DeserializeOwned,
    {
        let file = File::open(&self.file_path).unwrap();
        let reader = BufReader::new(file);
        let items: Vec<T> = serde_json::from_reader(reader).unwrap();

        items
    }
}
#[derive(Clone)]
pub struct ProductRepository {
    json_repository: JsonRepository,
}

impl ProductRepository {
    pub fn new(file_path: String) -> ProductRepository {
        ProductRepository {
            json_repository: JsonRepository::new(file_path),
        }
    }

    pub fn get_product(&self, id: &i32) -> Option<Product> {
        let products: Vec<Product> = self.json_repository.read_json();
        products.into_iter().find(|p| p.id == *id)
    }

    pub fn get_products(&self) -> Vec<Product> {
        self.json_repository.read_json()
    }
}

#[derive(Clone)]
pub struct CategoryRepository {
    json_repository: JsonRepository,
}

impl CategoryRepository {
    pub fn new(file_path: String) -> CategoryRepository {
        CategoryRepository {
            json_repository: JsonRepository::new(file_path),
        }
    }

    pub fn get_category(&self, id: &i32) -> Option<Category> {
        let categories: Vec<Category> = self.json_repository.read_json();
        categories.into_iter().find(|p| p.id == *id)
    }

    pub fn get_categories(&self) -> Vec<Category> {
        self.json_repository.read_json()
    }
}
