CREATE DATABASE IF NOT EXISTS turismo_alcolea CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE turismo_alcolea;

-- 3.1 Secciones (páginas fijas)
CREATE TABLE IF NOT EXISTS sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(120) NOT NULL,
  subtitle VARCHAR(160) DEFAULT NULL,
  body_html MEDIUMTEXT NULL,
  video_url VARCHAR(255) NULL,
  sort_order INT DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  is_key TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3.2 Imágenes de galería
CREATE TABLE IF NOT EXISTS gallery_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_id INT NULL,
  title VARCHAR(160) NULL,
  alt VARCHAR(160) NULL,
  url VARCHAR(255) NOT NULL,
  credit VARCHAR(160) NULL,
  sort_order INT DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 3.3 Eventos
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  category VARCHAR(60) NULL,
  start_date DATE NOT NULL,
  end_date DATE NULL,
  place VARCHAR(160) NULL,
  section_id INT NULL,
  description TEXT NULL,
  status ENUM('draft','published','cancelled') NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL,
  INDEX (start_date),
  INDEX (category)
) ENGINE=InnoDB;

-- 3.4 Establecimientos
CREATE TABLE IF NOT EXISTS establishments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  category ENUM('bar','restaurante','comercio','alojamiento') NOT NULL,
  description TEXT NULL,
  phone VARCHAR(40) NULL,
  website VARCHAR(200) NULL,
  address VARCHAR(200) NULL,
  lat DECIMAL(10,7) NULL,
  lng DECIMAL(10,7) NULL,
  photo_url VARCHAR(255) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX(category), INDEX(is_active)
) ENGINE=InnoDB;

-- 3.5 Hemeroteca
CREATE TABLE IF NOT EXISTS hemeroteca_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  kind ENUM('PDF','Fotos','Vídeo') NOT NULL DEFAULT 'PDF',
  file_url VARCHAR(255) NULL,
  gallery_section_id INT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gallery_section_id) REFERENCES sections(id) ON DELETE SET NULL,
  INDEX(year)
) ENGINE=InnoDB;

-- 3.6 Ítems de menú extra
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(80) NOT NULL,
  href VARCHAR(180) NOT NULL,
  sort_order INT NOT NULL DEFAULT 100,
  is_external TINYINT(1) NOT NULL DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Datos de ejemplo
INSERT INTO sections (slug, title, subtitle, body_html, video_url, sort_order, is_visible, is_key) VALUES
('iglesia','Iglesia','Textos, fotos y vídeo','<p>Breve descripción histórica y artística del templo. Sustituir por contenido real.</p>','https://www.youtube.com/embed/dQw4w9WgXcQ',10,1,1),
('museo','Museo','Descripción y actividades','<p>Información del museo: colecciones, horarios y actividades educativas con enlace a YouTube.</p>',NULL,20,1,1),
('casa-de-piedra','Casa de Piedra','Elemento emblemático','<p>Descripción, historia y uso actual. Fotos y vídeo.</p>',NULL,30,1,1),
('deportes','Deportes','Instalaciones, rutas y actividades','<p>Polideportivo, piscina, rutas BTT, etc.</p>',NULL,40,1,0),
('naturaleza','Naturaleza','Rutas, botánica, aves y parajes','<p>Mapas, tracks GPX y consejos prácticos.</p>',NULL,50,1,0),
('fiestas','Fiestas','Programas y calendario','<p>Consulta fechas señaladas en el calendario y revisa la hemeroteca por años.</p>',NULL,60,1,0),
('entorno','Entorno','Sigüenza · Medinaceli · Alto Tajo · Río Dulce','<p>Ideas de escapada con textos, galería y vídeo.</p>',NULL,70,1,0),
('galeria','Galería de imágenes','Ligada al resto de secciones','<p>Acceso a todas las imágenes creadas en las galerías.</p>',NULL,80,1,0),
('establecimientos','Establecimientos','Bares, restaurantes, comercios y alojamientos','<p>Listado con filtros y buscador.</p>',NULL,90,1,0),
('hemeroteca','Hemeroteca','Programas y galerías por años','<p>Consulta la hemeroteca.</p>',NULL,100,1,0),
('contacto','Contacto','Cómo llegar y formulario','<p>Teléfono, email y formulario de contacto.</p>',NULL,110,1,0);

INSERT INTO gallery_images (section_id, title, alt, url, credit, sort_order) VALUES
((SELECT id FROM sections WHERE slug='galeria'),'Paisaje 1','Paisaje 1','https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop','Unsplash',10),
((SELECT id FROM sections WHERE slug='galeria'),'Paisaje 2','Paisaje 2','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop','Unsplash',20),
((SELECT id FROM sections WHERE slug='galeria'),'Paisaje 3','Paisaje 3','https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop','Unsplash',30);

INSERT INTO events (title, category, start_date, end_date, place, section_id, description, status) VALUES
('Fiesta Mayor','Fiestas','2025-09-08',NULL,'Plaza Mayor',(SELECT id FROM sections WHERE slug='fiestas'),'Actos en plaza y recorrido.', 'published'),
('Taller familiar en el Museo','Museo','2025-09-10',NULL,'Museo Local',(SELECT id FROM sections WHERE slug='museo'),'Taller práctico para familias.', 'published'),
('Ruta guiada del Río Dulce','Naturaleza','2025-10-01',NULL,'Sendero Río Dulce',(SELECT id FROM sections WHERE slug='naturaleza'),'Recorrido interpretativo.', 'published'),
('Partido solidario','Deportes','2025-10-12',NULL,'Polideportivo',(SELECT id FROM sections WHERE slug='deportes'),'Encuentro benéfico.', 'published'),
('Concierto en la Iglesia','Cultura','2025-12-06',NULL,'Iglesia Parroquial',(SELECT id FROM sections WHERE slug='iglesia'),'Programa de música sacra.', 'published');

INSERT INTO establishments (name, category, description, phone, website, address, photo_url) VALUES
('Bar Plaza','bar','Tapas y terraza en la plaza.','+34 600 111 222',NULL,'Plaza Mayor, s/n',NULL),
('Restaurante Dulce','restaurante','Cocina local y menú diario.','+34 600 333 444',NULL,'C/ Real, 10',NULL),
('Alojamiento Río','alojamiento','Casa rural junto al río.','+34 600 555 666',NULL,'Camino del Río, km 1',NULL),
('Colmado Alcolea','comercio','Productos de proximidad.','+34 600 777 888',NULL,'Av. Castilla, 22',NULL),
('Hostal Central','alojamiento','Habitaciones en el centro.','+34 600 999 000',NULL,'C/ Mayor, 5',NULL);

INSERT INTO hemeroteca_entries (year, title, kind, file_url, gallery_section_id) VALUES
(2025,'Fiestas 2025 · Programa','PDF','/files/fiestas_2025.pdf',NULL),
(2025,'Galería 2025 · Agosto','Fotos',NULL,(SELECT id FROM sections WHERE slug='galeria')),
(2024,'Fiestas 2024 · Programa','PDF','/files/fiestas_2024.pdf',NULL),
(2023,'Fiestas 2023 · Programa','PDF','/files/fiestas_2023.pdf',NULL);

INSERT INTO menu_items (label, href, sort_order, is_external, is_visible) VALUES
('Ayuntamiento','https://www.tu-ayuntamiento.es',200,1,1);
