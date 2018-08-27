INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (1, 'Piłka nożna', FALSE);
INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (2, 'Skoki narciarskie', TRUE);
INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (3, 'Pływanie', TRUE);
INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (4, 'Piłka ręczna', FALSE);

INSERT INTO ROLE (ROL_USER, NAME) VALUES (1, 'ADMIN');
INSERT INTO ROLE (ROL_USER, NAME) VALUES (2, 'USER');

INSERT INTO USER (ID_USER, USERNAME, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (1, 'admin', 'admin@admin', 'Marek', 'Snieżek', '$2a$05$hCVNrTNJA.ZRAgx7LalY.eGCpEj5PxdnWxisVjhb9tvr1bZ751AFa');
INSERT INTO USER (ID_USER, USERNAME, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (2, 'mateusz', 'user1@user', 'Marian', 'Paździoch', '$2a$05$hCVNrTNJA.ZRAgx7LalY.eGCpEj5PxdnWxisVjhb9tvr1bZ751AFa');
INSERT INTO USER (ID_USER, USERNAME, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (3, 'rafał', 'user2@user', 'Ferdynand', 'Kiepski', '$2a$05$hCVNrTNJA.ZRAgx7LalY.eGCpEj5PxdnWxisVjhb9tvr1bZ751AFa');
INSERT INTO USER (ID_USER, USERNAME, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (4, 'adam', 'user2@user', 'Ferdynand', 'Kiepski', '$2a$05$hCVNrTNJA.ZRAgx7LalY.eGCpEj5PxdnWxisVjhb9tvr1bZ751AFa');

INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (1, 1);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (1, 2);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (2, 2);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (3, 2);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (4, 2);

INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (1, 'Arka Gdynia', 1);
INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (2, 'Adam Malysz', 2);
INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (3, 'Kamil Stoch', 2);
INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (4, 'Legia Warszawa', 1);

INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (1, TRUE, TO_DATE('2018-05-12','YYYY-MM-DD'), TO_DATE('2018-10-19','YYYY-MM-DD'), 'Real-Barca', 1);
INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (2, FALSE, TO_DATE('2018-08-09','YYYY-MM-DD'), TO_DATE('2018-10-01','YYYY-MM-DD'), 'PSG-Juventus', 1);
INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (3, TRUE, TO_DATE('2018-04-09','YYYY-MM-DD'), TO_DATE('2018-10-01','YYYY-MM-DD'), 'Turniej czterech skoczni', 2);
INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (4, TRUE, TO_DATE('2018-04-09','YYYY-MM-DD'), TO_DATE('2018-05-01','YYYY-MM-DD'), 'Turniej czterech skoczni', 2);
INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (5, TRUE, TO_DATE('2018-04-09','YYYY-MM-DD'), TO_DATE('2018-05-01','YYYY-MM-DD'), 'Turniej czterech skoczni', 2);

INSERT INTO EVENT_MEMBER (ID_EVENT, ID_MEMBER) VALUES(1, 1);
INSERT INTO EVENT_MEMBER (ID_EVENT, ID_MEMBER) VALUES(1, 2);
