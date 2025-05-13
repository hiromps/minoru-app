/*
  # 在庫管理システムの初期スキーマ

  1. 新規テーブル
    - `materials` (資材マスタ)
      - `id` (uuid, 主キー)
      - `name` (text, 資材名)
      - `code` (text, 資材コード)
      - `stock` (integer, 在庫数)
      - `lead_time` (integer, 発注リードタイム)
      - `average_usage` (integer, 平均使用数)
      - `location` (text, 保管場所)
      - `supplier` (text, 発注先)
      - `threshold` (integer, 発注閾値)
      - `unit_of_measure` (text, 単位)
      - `unit_price` (decimal, 単価)
      - 作成日時、更新日時

    - `products` (商品マスタ)
      - `id` (uuid, 主キー)
      - `name` (text, 商品名)
      - `code` (text, 商品コード)
      - `lead_time` (integer, 出荷リードタイム)
      - `procedure` (text, 製造/出荷手順)
      - 作成日時、更新日時

    - `product_materials` (商品-資材関連)
      - `id` (uuid, 主キー)
      - `product_id` (uuid, 商品ID)
      - `material_id` (uuid, 資材ID)
      - `quantity` (integer, 必要数量)

    - `orders` (受注)
      - `id` (uuid, 主キー)
      - `customer_name` (text, 客先名)
      - `customer_code` (text, 客先コード)
      - `priority` (text, 優先度)
      - `due_date` (timestamptz, 納期)
      - `status` (text, ステータス)
      - 作成日時、更新日時

    - `order_items` (受注明細)
      - `id` (uuid, 主キー)
      - `order_id` (uuid, 受注ID)
      - `product_id` (uuid, 商品ID)
      - `quantity` (integer, 数量)

    - `transactions` (入出荷履歴)
      - `id` (uuid, 主キー)
      - `type` (text, 入荷/出荷)
      - `material_id` (uuid, 資材ID)
      - `quantity` (integer, 数量)
      - `order_id` (uuid, 関連受注ID)
      - `notes` (text, 備考)
      - 作成日時

  2. セキュリティ
    - すべてのテーブルでRLSを有効化
    - 認証済みユーザーのみアクセス可能なポリシーを設定

  3. インデックス
    - コード検索用のインデックス
    - 日付検索用のインデックス
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Materials table
CREATE TABLE materials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  stock integer NOT NULL DEFAULT 0,
  lead_time integer NOT NULL DEFAULT 0,
  average_usage integer NOT NULL DEFAULT 0,
  location text,
  supplier text,
  threshold integer NOT NULL DEFAULT 0,
  unit_of_measure text NOT NULL,
  unit_price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX materials_code_idx ON materials(code);

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  lead_time integer NOT NULL DEFAULT 0,
  procedure text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX products_code_idx ON products(code);

-- Product Materials table
CREATE TABLE product_materials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(product_id, material_id)
);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name text NOT NULL,
  customer_code text NOT NULL,
  priority text NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  due_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')) DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX orders_customer_code_idx ON orders(customer_code);
CREATE INDEX orders_due_date_idx ON orders(due_date);
CREATE INDEX orders_status_idx ON orders(status);

-- Order Items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL CHECK (type IN ('inbound', 'outbound')),
  material_id uuid NOT NULL REFERENCES materials(id),
  quantity integer NOT NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX transactions_material_id_idx ON transactions(material_id);
CREATE INDEX transactions_created_at_idx ON transactions(created_at);

-- Enable Row Level Security
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read materials"
  ON materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read product_materials"
  ON product_materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read order_items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (true);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_materials_updated_at
    BEFORE UPDATE ON materials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();