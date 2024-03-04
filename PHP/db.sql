CREATE DATABASE IF not EXISTS orangic;

USE orangic;

CREATE TABLE Users (
    Id VARCHAR(20) PRIMARY KEY, Name VARCHAR(25) NOT NULL, Email VARCHAR(60) NOT NULL, Password VARCHAR(30) NOT NULL, `Rank` INTEGER, `Status` VARCHAR(20), CreateAt DATETIME, UpdateAt DATETIME, DeleteAt DATETIME
);

CREATE TABLE Restaurants (
    Id VARCHAR(20) PRIMARY KEY, Name VARCHAR(25) NOT NULL, Introduction VARCHAR(300), Address VARCHAR(50), City VARCHAR(30), Ward VARCHAR(30), District VARCHAR(40), Phone VARCHAR(20), Email VARCHAR(60), Status VARCHAR(20), ownerID VARCHAR(20) NOT NULL, FOREIGN KEY (ownerID) REFERENCES Users (Id)
);

CREATE TABLE Foods (
    Id VARCHAR(20) PRIMARY KEY, Name VARCHAR(30) NOT NULL, Description VARCHAR(300), TimeMade TIME, FeatureItem BOOLEAN, Price DECIMAL(10, 2), Status VARCHAR(20), Discount INTEGER CHECK (
        Discount >= 0
        AND Discount <= 100
    ), RestaurantID VARCHAR(20) NOT NULL, FOREIGN KEY (RestaurantID) REFERENCES Restaurants (Id)
);

CREATE TABLE Tags (
    Id VARCHAR(20) PRIMARY KEY, Name VARCHAR(20) NOT NULL, FoodID VARCHAR(20) NOT NULL, FOREIGN KEY (FoodID) REFERENCES Foods (Id)
);

CREATE TABLE Admin (
    Id VARCHAR(20) PRIMARY KEY, Name VARCHAR(25) NOT NULL, Email VARCHAR(60) NOT NULL, Password VARCHAR(30) NOT NULL, Job VARCHAR(20) NOT NULL, `Status` VARCHAR(20), CreateAt DATETIME, UpdateAt DATETIME, DeleteAt DATETIME
);

CREATE TABLE FavList (
    Id VARCHAR(20) PRIMARY KEY, UserID VARCHAR(20) NOT NULL, TargetID VARCHAR(20) NOT NULL, FOREIGN KEY (UserID) REFERENCES Users (Id)
);

CREATE TABLE Address (
    Id VARCHAR(20) PRIMARY KEY, OwnerID VARCHAR(20) NOT NULL, Phone VARCHAR(15), Address VARCHAR(50), City VARCHAR(30), Ward VARCHAR(30), District VARCHAR(40)
);

ALTER TABLE Users
ADD COLUMN AddressID VARCHAR(20),
ADD CONSTRAINT FK_User_Main_Address FOREIGN KEY (AddressID) REFERENCES Address (Id);

ALTER TABLE Admin
ADD COLUMN AddressID VARCHAR(20),
ADD CONSTRAINT FK_Address_Address FOREIGN KEY (AddressID) REFERENCES Address (Id);

CREATE TABLE Coupons (
    Id VARCHAR(20) PRIMARY KEY, Code VARCHAR(6) NOT NULL, Discount INTEGER, Type VARCHAR(10), Amount INTEGER, Start DATETIME, End DATETIME, CreateAt DATETIME, UpdateAt DATETIME, CreateBy VARCHAR(20) NOT NULL, UpdateBy VARCHAR(20) NOT NULL, FOREIGN KEY (CreateBy) REFERENCES Admin (Id), FOREIGN KEY (UpdateBy) REFERENCES Admin (Id)
);

CREATE TABLE CouponItems (
    Id VARCHAR(20) PRIMARY KEY, CouponID VARCHAR(20) NOT NULL, FoodID VARCHAR(20) NOT NULL, FOREIGN KEY (CouponID) REFERENCES Coupons (Id), FOREIGN KEY (FoodID) REFERENCES Foods (Id)
);

CREATE TABLE CouponUser (
    Id VARCHAR(20) PRIMARY KEY, Status VARCHAR(20) Not NULL, UserID VARCHAR(20) NOT NULL, CouponID VARCHAR(20) NOT NULL, FOREIGN KEY (UserID) REFERENCES Users (Id), FOREIGN KEY (CouponID) REFERENCES Coupons (Id)
);

CREATE TABLE Events (
    Id VARCHAR(20) PRIMARY KEY, Title VARCHAR(50) NOT NULL, Content VARCHAR(300), Start DATETIME, End DATETIME, CreateAt DATETIME, UpdateAt DATETIME, CreateBy VARCHAR(20) NOT NULL, UpdateBy VARCHAR(20) NOT NULL, CouponID VARCHAR(20) NOT NULL, FOREIGN KEY (CreateBy) REFERENCES Admin (Id), FOREIGN KEY (UpdateBy) REFERENCES Admin (Id), FOREIGN KEY (CouponID) REFERENCES Coupons (Id)
);

CREATE TABLE Images (
    Id VARCHAR(20) PRIMARY KEY, OwnerID VARCHAR(20) NOT NULL
);

CREATE TABLE Orders (
    Id VARCHAR(20) PRIMARY KEY, UserID VARCHAR(20) NOT NULL, CouponID VARCHAR(20), TotalValue DECIMAL, Status VARCHAR(20), ArriveAt DATETIME, Delivery DECIMAL, CreateAt DATETIME, UpdateAt DATETIME, DeleteAt DATETIME, AddressID VARCHAR(20) NOT NULL, FOREIGN KEY (CouponID) REFERENCES Coupons (Id), FOREIGN KEY (AddressID) REFERENCES Address (Id)
);

CREATE TABLE OrderItems (
    Id VARCHAR(20) PRIMARY KEY, OrderID VARCHAR(20) NOT NULL, FoodID VARCHAR(20) NOT NULL, Quantity INTEGER, Price DECIMAL, FOREIGN KEY (OrderID) REFERENCES Orders (Id), FOREIGN KEY (FoodID) REFERENCES Foods (Id)
);

CREATE TABLE Reviews (
    Id VARCHAR(20) PRIMARY KEY, Point INTEGER, UserID VARCHAR(20) NOT NULL, TargetID VARCHAR(20) NOT NULL, Comment VARCHAR(300), CreateAt DATETIME, UpdateAt DATETIME, FOREIGN KEY (UserID) REFERENCES Users (Id)
);

CREATE TABLE Notifications (
    Id VARCHAR(20) PRIMARY KEY, Title VARCHAR(50) NOT NULL, Content VARCHAR(300), IsRead BOOLEAN, CreateAt DATETIME, UserID VARCHAR(20) NOT NULL, GiftID VARCHAR(20), Creator VARCHAR(25) NOT NULL, CreatorPic VARCHAR(25) NOT NULL, FOREIGN KEY (UserID) REFERENCES Users (Id), FOREIGN KEY (GiftID) REFERENCES Coupons (Id) FOREIGN KEY (CreatorPic) REFERENCES Images (Id)
);

CREATE TABLE Schedules (
    Id VARCHAR(20) PRIMARY KEY, AddressID VARCHAR(20) NOT NULL, `Interval` VARCHAR(15), Time VARCHAR(5), InList BOOLEAN, FoodID VARCHAR(20) NOT NULL, UserID VARCHAR(20) NOT NULL, FOREIGN KEY (UserID) REFERENCES Users (Id), FOREIGN KEY (FoodID) REFERENCES Foods (Id), FOREIGN KEY (AddressID) REFERENCES Address (Id)
);

CREATE TABLE Reports (
    Id VARCHAR(20) PRIMARY KEY, Title VARCHAR(50) NOT NULL,
    Content VARCHAR(300),
    CreateAt DATETIME,
    ReplyAt DATETIME,
    Reply VARCHAR(300),
    Author VARCHAR(20) NOT NULL,
    ReplyBy VARCHAR(20),
    TargetID VARCHAR(20) NOT NULL,
    ImageID VARCHAR(20),
    FOREIGN KEY (Author) REFERENCES Users (Id),
    FOREIGN KEY (ReplyBy) REFERENCES Admin (Id), 
    FOREIGN KEY (ImageID) REFERENCES Images (Id)
);

-- Insert data into reports table

insert into reports (Id, Title, Content, CreateAt,Author, TargetID) values ('REPMUZNGJHZA2EOLW2Y6','Scammed Restaurant took my money without serving', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', NOW(), 'USR0BTKPMCW2MQ257BQM','RESS8BPXB3BACUPKUQKR'), ('REPE48ELFLNYMSACZP6E','This Restaurant over price their meals', 'Sed sagittis. Nam congue, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', NOW(),'USRDXMWG8VSP0M6WD2X0','RESYO9DSZUETFA1028FZ'),('REPB9Q54GPWUVI3UZ6QH','This Person is just too toxic', 'He just keep going on and harass a good restaurant out of no where', NOW(),'USRDXMWG8VSP0M6WD2X0','USRY68NYKNNEM6THPJ4H')

-- Inserting data into Users table
INSERT INTO
    Users (
        Id, Name, Email, Password, `Rank`, `Status`, CreateAt, UpdateAt, DeleteAt, AddressID
    )
VALUES (
        'USRIM4TLCSI0EHZHMU2U', 'John Doe', 'john@example.com', 'password123', 0, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USRCSN3EEYOCQ64NNAF6', 'Jane Smith', 'jane@example.com', 'securepass', 200, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USRZP72UZG1N8FACD6X3', 'Alice Johnson', 'alice@example.com', 'pass123', 50, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USR8J2NQW9PGBR4K25LX', 'Bob Wilson', 'bob@example.com', 'securepwd', 100, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USR9C1OV6KYPSW8V7ZDM', 'Eva Davis', 'eva@example.com', 'evapass', 150, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USR6JT4G3XK2LH97PONV', 'Mike Thompson', 'mike@example.com', 'mikemypass', 75, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USR2IL8D7WUK34EABHP1', 'Sophie Brown', 'sophie@example.com', 'password321', 125, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USRWMG9ZVKXIJYR5B43D', 'David Miller', 'david@example.com', 'davidpass', 25, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USRPJAYLZCNDM5V8G32K', 'Grace Wilson', 'grace@example.com', 'gracepass', 175, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USRKCAEFPNW9M74YDG5R', 'Chris Johnson', 'chris@example.com', 'chrispass', 90, 'Active', NOW(), NOW(), NULL, NULL
    ),
    (
        'USRSS5NDR2A62S0TTTV4', 'Amy Cearley', 'acearley0@netvibes.com', 'xW1|G7TZmQ94nSJ', 87, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRV5RX3TFYXBXPFJDJC', 'Cristin Jobbing', 'cjobbing1@washingtonpost.com', 'bV3(Zsqsap{', 29, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRXSMG7PXTFDYYTZS6K', 'Myrah Coraini', 'mcoraini2@washingtonpost.com', 'rF4~Xr#}F}f`{.vf', 46, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRY536BMXHCCJX38VGE', 'Dagmar Cottie', 'dcottie3@umn.edu', 'xQ9\`brSYFp12bzX', 29, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRZ8FPNTZAW5TPH76P5', 'Gerard Goodbody', 'ggoodbody4@wikia.com', 'oI9"sW`XA', 195, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR0RA7KT7TNQKBRXPC8', 'Tiena Loseke', 'tloseke5@nih.gov', 'mF4+zkK/', 52, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR1ZCE1ASNKJPFP1CPT', 'Bradley Parzis', 'bparzis6@last.fm', 'jX6/W5z<NP!BE(.', 143, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR344P3J8QATNEHQTSP', 'Parrnell Gonnelly', 'pgonnelly7@vkontakte.ru', 'dR7#6$Z47|7)', 96, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR4883KR77CPFRSATX2', 'Erik Grewar', 'egrewar8@sohu.com', 'qY9~B{h1NZcjHw7', 9, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR5EJE8D2Q1QVQTHFSV', 'Jarad Dolligon', 'jdolligon9@fotki.com', 'hR8(A#KJ\oj', 155, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR6WTJHJPSVKXWCRZFX', 'Ives Burchatt', 'iburchatta@gov.uk', 'vP4/<FN+', 167, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR7C3F4KDPV8NBEJ8QM', 'Orson Aitchinson', 'oaitchinsonb@bloglines.com', 'lZ3,K_|A3', 13, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR914C625B8Z9YHF2AR', 'Archibald Gerriessen', 'agerriessenc@addtoany.com', 'iN0''a!(75G', 127, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRA2QRX6Q4DGP2MJCC1', 'Richard Sharpling', 'rsharplingd@sitemeter.com', 'qY4?D(1D*T9R6H''w', 26, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRBG29F5Y94D9JZDJ89', 'Hagen Watman', 'hwatmane@ezinearticles.com', 'vX4)&kO?*}''MW', 105, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRCXN7F5GYSXH4DRJX0', 'Nicki Irnis', 'nirnisf@de.vu', 'oA4<j$fj', 10, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRDXMWG8VSP0M6WD2X0', 'Tudor Tuiller', 'ttuillerg@ca.gov', 'lC4,8qLbsn', 20, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRETWX1CB6A5PP2CYF8', 'Trev Claussen', 'tclaussenh@nsw.gov.au', 'gZ8*B|qMj(h1Fo$', 39, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRFPPV277JATV5WYGDK', 'Tybie Eeles', 'teelesi@google.co.jp', 'tC8~H43$X0', 17, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRHKNMQS0R63Y2PMM5N', 'Amalea Simmonite', 'asimmonitej@phoca.cz', 'uJ8+QPd2', 162, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRJAXCJE1J3EKBCMFC7', 'Rosie Van der Beek', 'rvank@utexas.edu', 'tF9&eF?~"#{/hyaQ', 35, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRKR7R0RG5K6FNX6SZQ', 'Ettore Hooks', 'ehooksl@aboutads.info', 'jH9=wE78)', 143, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRM6E98NRGG3WFP08SD', 'Dorelle Dalliston', 'ddallistonm@twitpic.com', 'hB4?&(LA', 195, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRNGF2W3JN1HH0K7XDD', 'Archibold Ingon', 'aingonn@furl.net', 'tI9%t6nn2>gnTV=', 94, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRP8K8GJDNYENMVXT7X', 'Pattie Munn', 'pmunno@cam.ac.uk', 'hW2$fZ?FdQPL0.FY', 185, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRQYWARAC6NSXR9S0DB', 'Emeline Newcomen', 'enewcomenp@webmd.com', 'rR5!NMa}E', 86, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRS8887GV2M98ETJP7Z', 'Rasia Zuann', 'rzuannq@fema.gov', 'rV3#}/(ZxaeWRr', 107, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRT7YBAVD2WV55CH0HQ', 'Rakel Ewbanck', 'rewbanckr@unicef.org', 'pJ5~eA.S)YN', 103, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRVP6YF79VS5HW3M8CZ', 'Rudolf Gerb', 'rgerbs@opera.com', 'dX4\>?.3CRF`~b7', 192, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRWK5GBBVGBW3W4945N', 'Elsy Bendin', 'ebendint@virginia.edu', 'vU5&_E%''+Cb', 25, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRXGHMFYSRDM4Y5XCBA', 'Berny Palmar', 'bpalmaru@e-recht24.de', 'vX2&Yy,eM=', 135, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRY738ZPC8KWKTS4Y73', 'Jeramie McMichan', 'jmcmichanv@accuweather.com', 'dC9.%@9OE!j#`''G', 29, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRZSE21VZBXX02B8DP8', 'Zacharias Belvin', 'zbelvinw@nyu.edu', 'aK5`)U@HUb"''', 154, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR0BTKPMCW2MQ257BQM', 'Ruy Oakinfold', 'roakinfoldx@biblegateway.com', 'sM3&4%+P', 50, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR1RAPXGE7Q6KJKD80V', 'Kendal Hannaford', 'khannafordy@prweb.com', 'tR9!/Dwm5N47e0', 21, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR2RNRREQSN8ZEQBMVA', 'Esta Phillippo', 'ephillippoz@trellian.com', 'xD8|mu0M', 188, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR4K23JWD7K2FFKJ5S5', 'Rosemarie Casoni', 'rcasoni10@yahoo.com', 'sZ3$xaAPAsmiCR8J', 65, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR5KN3WV4TQHCDJRYP0', 'Ashli Mangeon', 'amangeon11@zimbio.com', 'uF3%VVO"Q', 191, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR6PRTTXD8KKHB62Z6M', 'Peyter Kynd', 'pkynd12@miibeian.gov.cn', 'uR5>)zE?~X)', 123, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR8ZF1QPW2XQNWHQV7A', 'Wilt Robatham', 'wrobatham13@forbes.com', 'aW9$r`1hp@T"', 127, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRAW4R81A592549ZE6W', 'Wenona Pryer', 'wpryer14@devhub.com', 'zB9_L%K?wx9QAXi#', 10, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRBBYSYMN13P2G7PGSN', 'Kikelia Cowsby', 'kcowsby15@accuweather.com', 'iN2)qRM{', 200, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRCVNT5X8T5R97VRTWJ', 'Jecho McKeag', 'jmckeag16@shutterfly.com', 'oW3,`.09ztl', 103, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRD5JEPXWV6PQT4EXDZ', 'Susi Lunny', 'slunny17@dyndns.org', 'wB9\J3UL', 58, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRE5NAN40HHCMF79ETX', 'Ardyce Esslement', 'aesslement18@whitehouse.gov', 'jZ3?3FiM', 57, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRFQAH0NBK0NHS3NMQ0', 'Hughie Disman', 'hdisman19@dedecms.com', 'yZ3{+mGj33n$b&2y', 122, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRGC1J7XXY8WJ29D2CN', 'Chelsey Triplet', 'ctriplet1a@tinypic.com', 'vS3"BZLOav1SW', 180, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRHTQ4VAHEGNER9BP79', 'Ainsley Brazelton', 'abrazelton1b@hc360.com', 'nB7=Xl_"C', 60, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRJMG7Q81GWXVEZ8GKD', 'Elfrieda Gages', 'egages1c@facebook.com', 'aR3&}?EAc?D', 84, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRKD6NSS15H69WKFE5K', 'Waldon Cupper', 'wcupper1d@de.vu', 'hG0$tAau2', 66, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRMAC87P0ZVY33WQ17T', 'Felizio Youle', 'fyoule1e@com.com', 'gO9`KJ!pCTwTI%x', 119, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRN8C35DBAEMZX1Y0ZQ', 'Quincey Border', 'qborder1f@patch.com', 'oQ6`~GdyZqy,}', 136, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRPN7W4MKRJK5E3ZQNS', 'Godfry Capener', 'gcapener1g@slate.com', 'oJ1>|%5?OO+)', 77, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRR22M6DCMZWSJYSJR7', 'Consuelo Huxley', 'chuxley1h@ebay.com', 'rG9(v%Y%', 147, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRSRMDH762MAA6CJVJT', 'Johanna McGirl', 'jmcgirl1i@nature.com', 'iJ0+R4\>,)C!i(', 118, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRTKW26ECPH4N8Y3J0Y', 'Casey Dives', 'cdives1j@exblog.jp', 'pL6+hSeddB', 0, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRVMZTPSQR449VQFH07', 'Rosita Heisman', 'rheisman1k@ted.com', 'uV3$(ZG#k=hlz?lA', 85, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRWNEMH996783DHTD92', 'Charin Sedwick', 'csedwick1l@google.com.hk', 'uQ8@<6y\7`B', 198, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRY68NYKNNEM6THPJ4H', 'Kirstin Avory', 'kavory1m@flavors.me', 'hD0.kqH.5SUrH{z', 69, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRZJ7PX7M2JPQTMCPVY', 'Horacio Mcwhinney', 'hmcwhinney1n@parallels.com', 'gJ3$="6I4Tj3', 44, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR1ZP2WBEKVFH3KTCBH', 'Chen Boog', 'cboog1o@yale.edu', 'vD3.f8N`v', 145, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR277JZTYDHSKZKXRM4', 'Lisabeth Trahear', 'ltrahear1p@wix.com', 'sD0`FUW8bDmw', 107, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR3XRMA8ZZKRQAV4ZJZ', 'Tuckie Grigoriscu', 'tgrigoriscu1q@google.es', 'nL7''QH&}x>G)nWW', 71, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR4TK64V6B302RYGFYV', 'Sula Matis', 'smatis1r@tuttocitta.it', 'mY2=#=PmY', 7, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR55GCHWD4Q8M9522EP', 'Zelda Reddyhoff', 'zreddyhoff1s@un.org', 'gW9$a!~/I#', 101, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR63VW4K263DNR7H9QK', 'Cazzie Winterburn', 'cwinterburn1t@omniture.com', 'cK1$&KmQ\hMh`5w', 128, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR7SP8KZ58JYQ6Q1E4M', 'Philbert Casolla', 'pcasolla1u@parallels.com', 'bX1+emR<g?l`8i', 154, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR9DB050VTCEXWSBD4V', 'Aleece Jopke', 'ajopke1v@360.cn', 'bE9.R*<y{`ph)q/', 24, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRAZ0J9HY9SCQKKV9ZB', 'Allie Uc', 'auc1w@g.co', 'yF0'',)AUPlX\Zg', 103, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRB78RVQY27NGAQ0W0S', 'Rupert McGreary', 'rmcgreary1x@msn.com', 'pC7@wx1DvVg', 29, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRCXK822DGA97KRJNBZ', 'Rochester Christauffour', 'rchristauffour1y@timesonline.co.uk', 'aV3)&?H@p?WRt7NK', 165, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRF5DB4VQ3TMJ1K52AA', 'Devonne Culy', 'dculy1z@spotify.com', 'jP0}h)k0&i=', 53, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRGRC7XMMYBH9779R0W', 'Wandie Meere', 'wmeere20@canalblog.com', 'hJ1<Wef~u''', 3, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRHQQW24FCN6PDJBPNW', 'Royce Klasen', 'rklasen21@senate.gov', 'mF9(17U)IT27GBXt', 81, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRK4HMJWRH83ZXC3PBK', 'Sandy Sleath', 'ssleath22@reuters.com', 'eW6"N%nFm4.o?"', 125, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRMTXXNKDP08S6Z16VX', 'Penny Otton', 'potton23@accuweather.com', 'bY6_bOVYI', 69, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRNN7Y21AFEM00BN8VR', 'Josias Kinnier', 'jkinnier24@blogtalkradio.com', 'nQ5?E67m', 127, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRPHJSZ9VVPWWV9EGN8', 'Michell Cannings', 'mcannings25@ed.gov', 'pK7>duoZz5', 135, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRQTKQERDW0M6PX6XZH', 'Brocky Bax', 'bbax26@indiegogo.com', 'iV8,LiAO#hn8', 151, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRRT71VSA7E5KRA5617', 'Ric Kenwin', 'rkenwin27@wiley.com', 'bY2*M#}*j"''2XPz', 62, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRS4KWYBQVWEZWTQX9P', 'Cosette Myrie', 'cmyrie28@oracle.com', 'xY3<v*GLaGS', 196, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRVHHWHZK7H5BVEVCEW', 'Candida Bride', 'cbride29@thetimes.co.uk', 'sB4(!N?zXa', 153, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRWG3T9H9QBM4D93RC1', 'Janelle Burley', 'jburley2a@army.mil', 'nX3=r+f<hjO8UT}', 187, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRXYP9YZ46HEQDCV3ES', 'Lowrance Gutch', 'lgutch2b@free.fr', 'bF1>YPNKB<zx', 63, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRY5GHC42SXGXV8G0YT', 'Jenna Standidge', 'jstandidge2c@house.gov', 'uX9_mP(0BF*T9''{', 179, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRZAV2KT103FDYC5H16', 'Gaby Townsend', 'gtownsend2d@sakura.ne.jp', 'pF9{"09m)lLBM', 106, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR0Q7MY7TVZ8N54CAY3', 'Ludovika Balfe', 'lbalfe2e@patch.com', 'xF5?CThj', 102, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR219M420F10VB2Y7PV', 'Toddy Steward', 'tsteward2f@networkadvertising.org', 'kZ3`bT`O_g#\F', 137, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR3P2CXCHB9RGXV8Z6C', 'Drona Heintzsch', 'dheintzsch2g@123-reg.co.uk', 'uO6<|"(<%7h', 125, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR4H52KTWY1MR66D831', 'Randa Kentish', 'rkentish2h@yellowbook.com', 'rY3$4LCBh"`#', 68, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR5YAT5HJT6BV2CK5EJ', 'Lurline Slate', 'lslate2i@dell.com', 'sA4%&h75"t~dK=', 50, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR6WXHHVZBC55ZG37RC', 'Germaine Southcomb', 'gsouthcomb2j@exblog.jp', 'wG1_7)*T(bCrN6?>', 33, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR74BK2JQBE114QNG2H', 'Elberta Pawlicki', 'epawlicki2k@chron.com', 'nG7/~GBn0#(', 96, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR8RQYG534KC4Z9K8BR', 'Reagan Pabel', 'rpabel2l@nhs.uk', 'uF7"gZargsgR|_@', 59, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USR97D6ZSHP94BSEQC8T', 'Pennie Paice', 'ppaice2m@eventbrite.com', 'nR8!ek$,j2', 76, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRA52MTMKS60A5F35ZD', 'Lenette Sebastian', 'lsebastian2n@naver.com', 'xU1`u.''q*i41', 110, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRBFDPERJWSW75DH1F4', 'Delia Hawking', 'dhawking2o@java.com', 'wO7<9UGBgBDV', 106, 'Inactive', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRCCA8RN6BK956AQNKS', 'Pedro Regitz', 'pregitz2p@netlog.com', 'bP3$k''HU', 165, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USRDMQ03DEQZN704N9FQ', 'Judd Charlot', 'jcharlot2q@woothemes.com', 'yG5''RzmA5+JabH', 82, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    ),
    (
        'USREVYXP5TBVXVC8PHN2', 'Jerome Makey', 'jmakey2r@jiathis.com', 'cG5*Vl_Utfl7', 80, 'Active', '2024-01-24 20:37:47', '2024-01-24 20:37:47', null, null
    );

-- Inserting data into Address table
INSERT INTO
    Address (
        Id, OwnerID, Phone, Address, City, Ward, District
    )
VALUES (
        'ADDGC2FYJ4I6AB8CZEUO', 'USR6JT4G3XK2LH97PONV', '0175724742', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Phúc Xá'
    ),
    (
        'ADDY8QB4K0AOMFBGR329', 'USRCSN3EEYOCQ64NNAF6', '0736815849', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Trúc Bạch'
    ),
    (
        'ADD0PA2SGWHY10AOAHE3', 'USRIM4TLCSI0EHZHMU2U', '0445996701', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Vĩnh Phúc'
    ),
    (
        'ADDCD8BCWLZESBRBE428', 'USRCSN3EEYOCQ64NNAF6', '0860819293', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Cống Vị'
    ),
    (
        'ADDDF5W6ORJXL14TA82J', 'USRKCAEFPNW9M74YDG5R', '0937728824', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Liễu Giai'
    ),
    (
        'ADDJDFJ72117PXLN4166', 'USR9C1OV6KYPSW8V7ZDM', '0430689214', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Nguyễn Trung Trực'
    ),
    (
        'ADD747B2THLT4FWJ7GRE', 'USR2IL8D7WUK34EABHP1', '0098502891', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Quán Thánh'
    ),
    (
        'ADDWOXZS77QRZKKOCX3V', 'USRIM4TLCSI0EHZHMU2U', '0645782007', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Ngọc Hà'
    ),
    (
        'ADD7O32OJ4E8HZTB7VH9', 'USRZP72UZG1N8FACD6X3', '0311482889', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Điện Biên'
    ),
    (
        'ADD9ZOZ0K9FXIMSUY7D7', 'USR8J2NQW9PGBR4K25LX', '0182555069', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Đội Cấn'
    ),
    (
        'ADD0QI3A2ZFT7T2N4I9R', 'USRZP72UZG1N8FACD6X3', '0814035571', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Ngọc Khánh'
    ),
    (
        'ADDUKA82Y3KOU1Q8OG9W', 'USRKCAEFPNW9M74YDG5R', '0935250631', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Kim Mã'
    ),
    (
        'ADDG0VH6KBZ3FTDMBE7E', 'USR6JT4G3XK2LH97PONV', '0478024138', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Giảng Võ'
    ),
    (
        'ADDZ6BKUCC71PXEOKVO9', 'USRIM4TLCSI0EHZHMU2U', '0718790270', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Thành Công'
    );

UPDATE Users
SET
    AddressID = (
        SELECT Id
        FROM Address
        WHERE
            Address.OwnerID = Users.Id
        LIMIT 1
    )
WHERE
    EXISTS (
        SELECT 1
        FROM Address
        WHERE
            Address.OwnerID = Users.Id
    );

-- Inserting data into Restaurants table
INSERT INTO
    Restaurants (
        Id, Name, Introduction, Address, City, District, Ward, Phone, Email, Status, ownerID
    )
VALUES (
        'RESXLQNY9RZCX14QATZC', 'Ember & Oak Bistro', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Phúc Xá', '0367777818', 'Ember&Oak Bistro@gmail.com', 'OPEN', 'USRKCAEFPNW9M74YDG5R'
    ),
    (
        'RESJY2OL7YFCOAV6LOEK', 'Coastal Cuisine Corner', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Trúc Bạch', '0690533515', 'CoastalCuisineCorner@gmail.com', 'OPEN', 'USRPJAYLZCNDM5V8G32K'
    ),
    (
        'RES9AGN0H6ZCFXH4FI5X', 'Ambrosia Eats House', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Vĩnh Phúc', '0510912137', 'AmbrosiaEatsHouse@gmail.com', 'OPEN', 'USRWMG9ZVKXIJYR5B43D'
    ),
    (
        'RES250FFADGCYKOXQFH6', 'Serene Palate Café', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Cống Vị', '0838714471', 'SerenePalateCafé@gmail.com', 'OPEN', 'USR2IL8D7WUK34EABHP1'
    ),
    (
        'RESS8BPXB3BACUPKUQKR', 'Urban Spice Delight', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Liễu Giai', '0458081951', 'UrbanSpiceDelight@gmail.com', 'OPEN', 'USR6JT4G3XK2LH97PONV'
    ),
    (
        'RES73Q93CYCJHYBWCC3R', 'Fusion Flavors Grill', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Nguyễn Trung Trực', '0953482123', 'FusionFlavorsGrill@gmail.com', 'OPEN', 'USR9C1OV6KYPSW8V7ZDM'
    ),
    (
        'RESYO9DSZUETFA1028FZ', 'Culinary Craftsmanship', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Quán Thánh', '0158622484', 'CulinaryCraftsmanship@gmail.com', 'OPEN', 'USR8J2NQW9PGBR4K25LX'
    ),
    (
        'RESTMLOP4FM13PU9MUII', 'Spice Symphony', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Ngọc Hà', '0458819564', 'SpiceSymphony@gmail.com', 'OPEN', 'USRZP72UZG1N8FACD6X3'
    ),
    (
        'RESFSSMNV5PRF1SA6IW0', 'Savory Bites Lounge', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo. Phasellusnon ultrices mauris.', '123 Main St', 'Thành phố Hà Nội', 'Quận Ba Đình', 'Phường Điện Biên', '0912541174', 'SavoryBitesLounge@gmail.com', 'OPEN', 'USRCSN3EEYOCQ64NNAF6'
    );

-- Inserting data into Foods table
INSERT INTO
    Foods (
        Id, Name, Description, TimeMade, FeatureItem, Price, Status, Discount, RestaurantID
    )
VALUES (
        "FOD58O598RSSGHH4CH5A", "Chicken Marsala", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:6:8", FALSE, "45", "Sale", "61", "RES250FFADGCYKOXQFH6"
    ),
    (
        "FODLSSMD59WV4WREDV6W", "Ceviche", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:11:49", TRUE, "7", "Sale", "26", "RESTMLOP4FM13PU9MUII"
    ),
    (
        "FODGZLZY8HJFQ9Y6IS4L", "Beef Stroganoff", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:39:38", FALSE, "32", "Sale", "31", "RESS8BPXB3BACUPKUQKR"
    ),
    (
        "FODEW1UL7AC7YGF96QO9", "Garlic Butter Shrimp", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:8:53", FALSE, "10", "Sale", "75", "RESJY2OL7YFCOAV6LOEK"
    ),
    (
        "FODCSQ27D9Z1ACQNSJU5", "Spinach and Artichoke Dip", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:7:1", TRUE, "46", "Sale", "40", "RESS8BPXB3BACUPKUQKR"
    ),
    (
        "FODQPXOSJE6FDK3WK8H8", "Tuna Salad", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:43:28", FALSE, "4", "Sale", "48", "RESTMLOP4FM13PU9MUII"
    ),
    (
        "FODA16MFOLI2HESNKIW6", "Chicken Noodle Soup", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:53:52", FALSE, "94", "Sale", "46", "RESXLQNY9RZCX14QATZC"
    ),
    (
        "FODO1FW78NUJM84GOM8N", "Chicken Enchiladas", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:13:17", FALSE, "35", "Sale", "43", "RESJY2OL7YFCOAV6LOEK"
    ),
    (
        "FODNDPTITVWJVIQ2F58Q", "Philly Cheesesteak", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:7:14", TRUE, "17", "Sale", "52", "RESTMLOP4FM13PU9MUII"
    ),
    (
        "FOD336HRDPIDW3048W07", "Shrimp Po' Boy", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:8:25", FALSE, "13", "Sale", "74", "RESS8BPXB3BACUPKUQKR"
    ),
    (
        "FOD0F6R07G6SJQCOP2UO", "Mushroom Risotto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:5:48", TRUE, "1", "Sale", "47", "RESXLQNY9RZCX14QATZC"
    ),
    (
        "FODT9SVDOWF8F2CZNCIL", "Buffalo Wings", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:38:10", TRUE, "82", "Sale", "32", "RES250FFADGCYKOXQFH6"
    ),
    (
        "FOD9NAVWRTK9SJCPFGI0", "Avocado Toast", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:35:11", TRUE, "16", "Sale", "19", "RESTMLOP4FM13PU9MUII"
    ),
    (
        "FODEV0AHX3O2O49LM9VB", "Ratatouille", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:41:24", TRUE, "62", "Sale", "92", "RESJY2OL7YFCOAV6LOEK"
    ),
    (
        "FOD1HKD22UE4EASAKR88", "Chicken Teriyaki", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:38:3", FALSE, "59", "Sale", "65", "RES250FFADGCYKOXQFH6"
    ),
    (
        "FODSVXGAS6K61MXC12S9", "Chicken Caesar Wrap", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:27:41", TRUE, "7", "Sale", "1", "RESTMLOP4FM13PU9MUII"
    ),
    (
        "FODI8EP2RK4AVWSQAYHO", "Falafel Wrap", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:35:27", TRUE, "62", "Sale", "96", "RESTMLOP4FM13PU9MUII"
    ),
    (
        "FOD5DVN8KLZKM0LTVLKB", "Margherita Flatbread", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:20:50", TRUE, "91", "Sale", "26", "RESYO9DSZUETFA1028FZ"
    ),
    (
        "FODAP5L1TV4ID4VID9AB", "Tom Yum Soup", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:29:13", TRUE, "31", "Sale", "66", "RESJY2OL7YFCOAV6LOEK"
    ),
    (
        "FODSPEKC5SKPKNDF1KK1", "Beef Burrito", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:33:20", FALSE, "84", "Sale", "74", "RESS8BPXB3BACUPKUQKR"
    ),
    (
        "FODN60X65U0L8HLHCS5T", "Baked Ziti", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:25:56", FALSE, "7", "Sale", "88", "RESJY2OL7YFCOAV6LOEK"
    ),
    (
        "FODVSXJ3G5C93L362NT4", "Chicken Kebabs", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:20:16", TRUE, "80", "Sale", "81", "RESFSSMNV5PRF1SA6IW0"
    ),
    (
        "FODT9AXWWKTL9T8LK10T", "Eggplant Parmesan", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "0:18:17", TRUE, "6", "Sale", "55", "RES9AGN0H6ZCFXH4FI5X"
    ),
    (
        "FODTWI7SIBEX4RB4SQE7", "Pesto Pasta", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:51:26", TRUE, "38", "Sale", "29", "RESS8BPXB3BACUPKUQKR"
    ),
    (
        "FODQUXXNY00T7N2Y4TZ1", "Chicken Quesadilla", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ex et turpisconvallis pharetra. In hac habitasse platea dictumst. Integer sed venenatis leo.", "1:26:56", TRUE, "43", "Sale", "96", "RES250FFADGCYKOXQFH6"
    );

-- Inserting data into Tags table
INSERT INTO
    Tags (Id, Name, FoodID)
VALUES (
        "TAGX5SFJ3VH2P634009F", "Elegant", "FODN60X65U0L8HLHCS5T"
    ),
    (
        "TAGKYRVYRNNRP1CTS9KY", "Raw", "FODEW1UL7AC7YGF96QO9"
    ),
    (
        "TAG6DTARAT57E978TZLP", "Steamed", "FODAP5L1TV4ID4VID9AB"
    ),
    (
        "TAGQL21CKML71EQSHC59", "Creamy", "FODO1FW78NUJM84GOM8N"
    ),
    (
        "TAG004X5AQVLB6BKCI3G", "Tender", "FODT9SVDOWF8F2CZNCIL"
    ),
    (
        "TAG25PJUGY975NGPFWFV", "Aromatic", "FODSPEKC5SKPKNDF1KK1"
    ),
    (
        "TAG3DCDHDYA3SWJGFG4Y", "Juicy", "FODN60X65U0L8HLHCS5T"
    ),
    (
        "TAGO6SHQFPW3UU9FZVUQ", "Crispy", "FOD1HKD22UE4EASAKR88"
    ),
    (
        "TAGLWFTS7QW4KFQ36RFQ", "Steamed", "FODNDPTITVWJVIQ2F58Q"
    ),
    (
        "TAGR9R0KH4CDS1I40N2I", "Velvety", "FODLSSMD59WV4WREDV6W"
    ),
    (
        "TAG6ARITT52M7IUB9JZK", "Marinated", "FODEW1UL7AC7YGF96QO9"
    ),
    (
        "TAGKE0YCP0L9O3NB7ZSW", "Juicy", "FOD58O598RSSGHH4CH5A"
    ),
    (
        "TAGT4X4FU9TGALGS6FIE", "Baked", "FOD336HRDPIDW3048W07"
    ),
    (
        "TAG2LRR73SNSXUZDV91P", "Homestyle", "FOD58O598RSSGHH4CH5A"
    ),
    (
        "TAG3UC5ZVNOLEZSX68SC", "Juicy", "FODT9AXWWKTL9T8LK10T"
    ),
    (
        "TAGLP9QPE5ZKJX9BF1LL", "Locally-sourced", "FODGZLZY8HJFQ9Y6IS4L"
    ),
    (
        "TAG934DKRG2KNQMZ55LA", "Robust", "FODTWI7SIBEX4RB4SQE7"
    ),
    (
        "TAGYEMF0DO2EP68MJ7KD", "Tempting", "FODVSXJ3G5C93L362NT4"
    ),
    (
        "TAG0G0D1E1LRAJLMA84P", "Herbal", "FODTWI7SIBEX4RB4SQE7"
    ),
    (
        "TAG6VEMLYZJ6H1NFC1Y6", "Fruity", "FOD58O598RSSGHH4CH5A"
    ),
    (
        "TAGAMXTYFJ0VLDIPEKM0", "Tender", "FODSVXGAS6K61MXC12S9"
    ),
    (
        "TAGF2AUWZ6DPKFY940XY", "Fruit", "FODQUXXNY00T7N2Y4TZ1"
    ),
    (
        "TAGEZG73Z1HGPX1RMM8B", "Roasted", "FODEW1UL7AC7YGF96QO9"
    ),
    (
        "TAGDKWWGLTKUOQXDIP9V", "Icy", "FODSVXGAS6K61MXC12S9"
    ),
    (
        "TAGN1URN1V8UKLAR3RDI", "Homestyle", "FODCSQ27D9Z1ACQNSJU5"
    ),
    (
        "TAGFIF1HTJOCSOXAIK6H", "Homestyle", "FOD5DVN8KLZKM0LTVLKB"
    ),
    (
        "TAGB76CLYV4PO8SUJMOF", "Elegant", "FODLSSMD59WV4WREDV6W"
    ),
    (
        "TAGL9J7P0HIF7W46QKSV", "Classic", "FODI8EP2RK4AVWSQAYHO"
    ),
    (
        "TAGNDSDE5ARTK7XXUI9I", "Farm-to-table", "FODEW1UL7AC7YGF96QO9"
    ),
    (
        "TAGR4U2GK1HLKOFHMKUR", "Sweet", "FODI8EP2RK4AVWSQAYHO"
    ),
    (
        "TAG419IUHMNKU5JF5DVJ", "Tempting", "FODN60X65U0L8HLHCS5T"
    ),
    (
        "TAGTSAIA6JHXYOQBIJ7V", "Bite-sized", "FODI8EP2RK4AVWSQAYHO"
    ),
    (
        "TAGT61HJJ1Z9BFHXJDAP", "Elegant", "FODVSXJ3G5C93L362NT4"
    ),
    (
        "TAGF9CXOVH529APJ9T0M", "Tropical", "FOD1HKD22UE4EASAKR88"
    ),
    (
        "TAGTDIAJYLFZVI7J3GN2", "Steamed", "FOD336HRDPIDW3048W07"
    ),
    (
        "TAG5FI8XSDB93CZJ1582", "Bitter", "FODT9SVDOWF8F2CZNCIL"
    ),
    (
        "TAGNDBCXJP0S69B3CMKO", "Bitter", "FODQUXXNY00T7N2Y4TZ1"
    ),
    (
        "TAG1G8AXNAPQ9GJF87CH", "Grilled", "FODQUXXNY00T7N2Y4TZ1"
    ),
    (
        "TAGV7WG6TH0WTLLG8BQA", "Picnic-perfect", "FODNDPTITVWJVIQ2F58Q"
    ),
    (
        "TAGLQ9DVM3GLQ532FH9U", "Picnic-perfect", "FODT9SVDOWF8F2CZNCIL"
    ),
    (
        "TAGQL2B8I3I4UGZDS8BN", "Classic", "FODN60X65U0L8HLHCS5T"
    ),
    (
        "TAGEILYOSQZAN7XAH3WZ", "Herbal", "FODEV0AHX3O2O49LM9VB"
    ),
    (
        "TAGNET2STMGAF05915SF", "Herbal", "FODO1FW78NUJM84GOM8N"
    ),
    (
        "TAGPFMOL8MM47FACL5JW", "Herbal", "FODTWI7SIBEX4RB4SQE7"
    ),
    (
        "TAGKJCOQFN28FD3MWLY8", "Roasted", "FODA16MFOLI2HESNKIW6"
    );

-- Inserting data into Admin table
INSERT INTO
    Admin (
        Id, Name, Email, Password, Job, Status, CreateAt, UpdateAt, DeleteAt, AddressID
    )
VALUES (
        "ADMIKZZ2HHVMMZT7XI0E", "Benjamin Carter", "BenjaminCarter@gmail.com", "123456", "Admin", "Active", Now(), Now(), null, null
    ),
    (
        "ADM7ANKA7YA7SVSNL5B6", "Olivia Ramirez", "OliviaRamirez@gmail.com", "123456", "Admin", "Active", Now(), Now(), null, null
    ),
    (
        "ADMIDNKYV6CZ1Q0KYJYJ", "Michael Anderson", "MichaelAnderson@gmail.com", "123456", "Admin", "Active", Now(), Now(), null, null
    );