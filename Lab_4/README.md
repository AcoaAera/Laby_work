# Lab_04 PostegreSQL | Partitioning

#### Создание секционированной таблицы:


    CREATE TABLE measurement (
        city_id         int not null,
        logdate         date not null,
        peaktemp        int,
        unitsales       int
    ) PARTITION BY RANGE (logdate);


#### Создание партиций к таблице "measurement", используя партиционирование по дате. На каждый месяц по своей партиции:


    CREATE TABLE measurement_y2020m01 PARTITION OF measurement FOR VALUES FROM ('2020-01-01') TO ('2020-02-01');
    CREATE TABLE measurement_y2020m02 PARTITION OF measurement FOR VALUES FROM ('2020-02-01') TO ('2020-03-01');
    CREATE TABLE measurement_y2020m03 PARTITION OF measurement FOR VALUES FROM ('2020-03-01') TO ('2020-04-01');
    CREATE TABLE measurement_y2020m04 PARTITION OF measurement FOR VALUES FROM ('2020-04-01') TO ('2020-05-01');
    CREATE TABLE measurement_y2020m05 PARTITION OF measurement FOR VALUES FROM ('2020-05-01') TO ('2020-06-01');
    CREATE TABLE measurement_y2020m06 PARTITION OF measurement FOR VALUES FROM ('2020-06-01') TO ('2020-07-01');
    CREATE TABLE measurement_y2020m07 PARTITION OF measurement FOR VALUES FROM ('2020-07-01') TO ('2020-08-01');
    CREATE TABLE measurement_y2020m08 PARTITION OF measurement FOR VALUES FROM ('2020-08-01') TO ('2020-09-01');
    CREATE TABLE measurement_y2020m09 PARTITION OF measurement FOR VALUES FROM ('2020-09-01') TO ('2020-10-01');
    CREATE TABLE measurement_y2020m10 PARTITION OF measurement FOR VALUES FROM ('2020-10-01') TO ('2020-11-01');
    CREATE TABLE measurement_y2020m11 PARTITION OF measurement FOR VALUES FROM ('2020-11-01') TO ('2020-12-01');
    CREATE TABLE measurement_y2020m12 PARTITION OF measurement FOR VALUES FROM ('2020-12-01') TO ('2021-01-01');


#### Заполнение таблицы "measurement". По 3 даты на каждый месяц. Даты при заполнении указаны в разброс
 

    INSERT INTO measurement VALUES(1,'2020-08-01',-10,2);
    INSERT INTO measurement VALUES(2,'2020-12-15',-20,3);
    INSERT INTO measurement VALUES(3,'2020-06-15',-15,4);
    INSERT INTO measurement VALUES(4,'2020-04-15',-17,5);
    INSERT INTO measurement VALUES(5,'2020-08-15',-12,7);
    INSERT INTO measurement VALUES(6,'2020-03-15',-23,1);
    INSERT INTO measurement VALUES(7,'2020-02-29',-27,5);
    INSERT INTO measurement VALUES(8,'2020-09-01',-11,6);
    INSERT INTO measurement VALUES(9,'2020-10-01',-9,1);
    INSERT INTO measurement VALUES(10,'2020-07-01',-22,7);
    INSERT INTO measurement VALUES(11,'2020-11-01',-19,6);
    INSERT INTO measurement VALUES(12,'2020-06-01',-19,7);
    INSERT INTO measurement VALUES(13,'2020-04-30',-18,8);
    INSERT INTO measurement VALUES(14,'2020-02-15',-17,1);
    INSERT INTO measurement VALUES(15,'2020-11-15',-13,2);
    INSERT INTO measurement VALUES(16,'2020-10-31',-15,3);
    INSERT INTO measurement VALUES(17,'2020-08-31',-15,4);
    INSERT INTO measurement VALUES(18,'2020-05-15',-17,5);
    INSERT INTO measurement VALUES(19,'2020-09-30',-18,6);
    INSERT INTO measurement VALUES(20,'2020-10-15',-19,7);
    INSERT INTO measurement VALUES(21,'2020-02-01',-11,8);
    INSERT INTO measurement VALUES(22,'2020-04-01',-13,9);
    INSERT INTO measurement VALUES(23,'2020-12-30',-9,0);
    INSERT INTO measurement VALUES(24,'2020-05-01',-14,1);
    INSERT INTO measurement VALUES(25,'2020-07-31',-12,2);
    INSERT INTO measurement VALUES(26,'2020-07-15',-19,3);
    INSERT INTO measurement VALUES(27,'2020-01-31',-17,4);
    INSERT INTO measurement VALUES(28,'2020-11-30',-15,5);
    INSERT INTO measurement VALUES(29,'2020-12-01',-16,6);
    INSERT INTO measurement VALUES(30,'2020-03-01',-20,2);
    INSERT INTO measurement VALUES(31,'2020-06-30',-17,10);
    INSERT INTO measurement VALUES(32,'2020-05-31',-16,3);
    INSERT INTO measurement VALUES(33,'2020-09-15',-11,2);
    INSERT INTO measurement VALUES(34,'2020-01-15',-20,15);
    INSERT INTO measurement VALUES(35,'2020-03-30',-15,2);
    INSERT INTO measurement VALUES(36,'2020-01-01',-30,30);
    
    
#### Данные в таблицу добавлены. Как можно заметить они отсортированы.

![](img/INSERT.jpg)

#### В базе данных показаны созданные секции таблицы "measurement" и данные в партиции "measurement_y2020m01"

    SELECT * FROM "sarafan"."measurement_y2020m01";

![](img/m_y2020m01.jpg)

#### Удаляем данные за январь:

    DROP TABLE "sarafan"."measurement_y2020m01";
    
![](img/DELETE.jpg)

При таком удалении данные из таблицы "measurement" удаляются также. На изображении отсутствуют данные за январь.

#### Отвязывание партиции от таблицы "measurement". Работа с ней будет производиться как с отдельной таблицей:

    ALTER TABLE measurement DETACH PARTITION measurement_y2020m02;
    
![](img/ALTER_TABLE.jpg)

Таблица "measurement_y2020m02" стала самостоятельной. Из основной таблицы удалились данные за февраль. Они хранятся в новой таблице. 

###  Возвращаем таблицу "measurement_y2020m02" партицией таблицы "measurement":

    ALTER TABLE measurement_y2020m02 ADD CONSTRAINT y2020m_02 
    CHECK ( logdate >= DATE '2020-02-01' AND logdate < DATE '2020-03-01' );
	   
    ALTER TABLE measurement ATTACH PARTITION measurement_y2020m02 
    FOR VALUES FROM ('2020-02-01') TO ('2020-03-01' );

![](img/ALTER_TABLE2.jpg)

Данные за февраль появились. Появилась партиция "measurement_y2020m02"