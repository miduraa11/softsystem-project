INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (1, 'Piłka nożna', FALSE);
INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (2, 'Skoki narciarskie', TRUE);
INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (3, 'Pływanie', TRUE);
INSERT INTO TYPE (ID_TYPE, DISCIPLINE, INDIVIDUAL) VALUES (4, 'Piłka ręczna', FALSE);

INSERT INTO ROLE (ROL_USER, NAME) VALUES (1, 'admin');
INSERT INTO ROLE (ROL_USER, NAME) VALUES (2, 'user');

INSERT INTO USER (ID_USER, LOGIN, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (1, 'admin', 'admin@admin', 'Marek', 'Snieżek', '9743a66f914cc249efca164485a19c5c');
INSERT INTO USER (ID_USER, LOGIN, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (2, 'mateusz', 'user1@user', 'Marian', 'Paździoch', '9743a66f914cc249efca164485a19c5c');
INSERT INTO USER (ID_USER, LOGIN, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (3, 'rafał', 'user2@user', 'Ferdynand', 'Kiepski', '9743a66f914cc249efca164485a19c5c');
INSERT INTO USER (ID_USER, LOGIN, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (4, 'adam', 'user2@user', 'Ferdynand', 'Kiepski', '9743a66f914cc249efca164485a19c5c');

INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (1, 1);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (1, 2);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (2, 2);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (3, 2);
INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (4, 2);

INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (1, 'Arka Gdynia', 1);
INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (2, 'Adam Malysz', 2);
INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (3, 'Kamil Stoch', 2);
INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (4, 'Legia Warszawa', 1);

INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (1, TRUE, TO_DATE('2018-05-12','YYYY-MM-DD'), TO_DATE('2018-06-19','YYYY-MM-DD'), 'Real-Barca', 1);
INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (2, FALSE, TO_DATE('2018-08-09','YYYY-MM-DD'), TO_DATE('2018-09-01','YYYY-MM-DD'), 'PSG-Juventus', 1);
INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, ID_TYPE) VALUES (3, TRUE, TO_DATE('2018-04-09','YYYY-MM-DD'), TO_DATE('2018-10-01','YYYY-MM-DD'), 'Turniej czterech skoczni', 2);

INSERT INTO BET (ID_BET, AMOUNT, BET_RESULT, PRIZE, RESULT, IS_GENERAL, ID_EVENT, ID_USER) VALUES(1, 100, TRUE, null, '2-1', FALSE, 1, 1);
INSERT INTO BET (ID_BET, AMOUNT, BET_RESULT, PRIZE, RESULT, IS_GENERAL, ID_EVENT, ID_USER) VALUES(2, 200, TRUE, null, 'Real', TRUE, 1, 3);
INSERT INTO BET (ID_BET, AMOUNT, BET_RESULT, PRIZE, RESULT, IS_GENERAL, ID_EVENT, ID_USER) VALUES(3, 140, FALSE, null, '2-3', FALSE, 1, 2);
INSERT INTO BET (ID_BET, AMOUNT, BET_RESULT, PRIZE, RESULT, IS_GENERAL, ID_EVENT, ID_USER) VALUES(4, 50, TRUE, null, '2-1', FALSE, 1, 2);
INSERT INTO BET (ID_BET, AMOUNT, BET_RESULT, PRIZE, RESULT, IS_GENERAL, ID_EVENT, ID_USER) VALUES(5, 400, FALSE, null, 'Real', TRUE, 1, 3);
INSERT INTO BET (ID_BET, AMOUNT, BET_RESULT, PRIZE, RESULT, IS_GENERAL, ID_EVENT, ID_USER) VALUES(6, 90, TRUE, null, '2-3', FALSE, 1, 4);


INSERT INTO EVENT_MEMBER (ID_EVENT, ID_MEMBER) VALUES(1, 1);
INSERT INTO EVENT_MEMBER (ID_EVENT, ID_MEMBER) VALUES(1, 2);