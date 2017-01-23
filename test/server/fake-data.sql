insert into Users values (2, 'Test', 'User 2', 'test.2@user.com', '', false, now(), now(), 100);

insert into Accounts values (12, 'Test Account USD', 'MicrosoftMoney', true, true, now(), now(), 101, 2);
insert into Accounts values (11, 'Test Account GBP', 'MicrosoftMoney', true, true, now(), now(), 100, 2);
insert into Accounts values (13, 'Test Account EUR', 'MicrosoftMoney', true, true, now(), now(), 102, 2);
insert into Accounts values (14, 'Disabled Account', 'MicrosoftMoney', false, true, now(), now(), 102, 2);
insert into Accounts values (15, 'Active but no stats', 'MicrosoftMoney', true, false, now(), now(), 102, 2);
insert into Accounts values (16, 'Completely disabled account', 'MicrosoftMoney', false, false, now(), now(), 102, 2);

# Fake transactions

insert into Transactions values (1000, 10, '2014-1-1', 'Description 1000', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1001, 10, '2014-2-1', 'Description 1001', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1002, 10, '2014-3-1', 'Description 1002', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1003, 10, '2014-4-1', 'Description 1003', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1004, 10, '2014-5-1', 'Description 1004', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1005, 10, '2014-6-1', 'Description 1005', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1006, 10, '2014-7-1', 'Description 1006', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1007, 10, '2014-8-1', 'Description 1007', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1008, 10, '2014-9-1', 'Description 1008', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1009, 10, '2014-10-1', 'Description 1009', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1010, 10, '2014-11-1', 'Description 1010', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1011, 10, '2014-12-1', 'Description 1011', null, now(), now(), 12, null, 1, null);
insert into Transactions values (1012, 10, '2014-1-1', 'Description 1012', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1013, 10, '2014-2-1', 'Description 1013', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1014, 10, '2014-3-1', 'Description 1014', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1015, 10, '2014-4-1', 'Description 1015', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1016, 10, '2014-5-1', 'Description 1016', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1017, 10, '2014-6-1', 'Description 1017', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1018, 10, '2014-7-1', 'Description 1018', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1019, 10, '2014-8-1', 'Description 1019', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1020, 10, '2014-9-1', 'Description 1020', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1021, 10, '2014-10-1', 'Description 1021', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1022, 10, '2014-11-1', 'Description 1022', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1023, 10, '2014-12-1', 'Description 1023', null, now(), now(), 13, null, 1, null);
insert into Transactions values (1024, 10, '2014-1-1', 'Description 1024', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1025, 10, '2014-2-1', 'Description 1025', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1026, 10, '2014-3-1', 'Description 1026', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1027, 10, '2014-4-1', 'Description 1027', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1028, 10, '2014-5-1', 'Description 1028', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1029, 10, '2014-6-1', 'Description 1029', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1030, 10, '2014-7-1', 'Description 1030', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1031, 10, '2014-8-1', 'Description 1031', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1032, 10, '2014-9-1', 'Description 1032', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1033, 10, '2014-10-1', 'Description 1033', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1034, 10, '2014-11-1', 'Description 1034', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1035, 10, '2014-12-1', 'Description 1035', null, now(), now(), 14, null, 1, null);
insert into Transactions values (1036, 10, '2014-1-1', 'Description 1036', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1037, 10, '2014-2-1', 'Description 1037', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1038, 10, '2014-3-1', 'Description 1038', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1039, 10, '2014-4-1', 'Description 1039', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1040, 10, '2014-5-1', 'Description 1040', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1041, 10, '2014-6-1', 'Description 1041', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1042, 10, '2014-7-1', 'Description 1042', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1043, 10, '2014-8-1', 'Description 1043', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1044, 10, '2014-9-1', 'Description 1044', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1045, 10, '2014-10-1', 'Description 1045', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1046, 10, '2014-11-1', 'Description 1046', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1047, 10, '2014-12-1', 'Description 1047', null, now(), now(), 15, null, 1, null);
insert into Transactions values (1048, 10, '2014-1-1', 'Description 1048', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1049, 10, '2014-2-1', 'Description 1049', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1050, 10, '2014-3-1', 'Description 1050', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1051, 10, '2014-4-1', 'Description 1051', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1052, 10, '2014-5-1', 'Description 1052', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1053, 10, '2014-6-1', 'Description 1053', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1054, 10, '2014-7-1', 'Description 1054', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1055, 10, '2014-8-1', 'Description 1055', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1056, 10, '2014-9-1', 'Description 1056', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1057, 10, '2014-10-1', 'Description 1057', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1058, 10, '2014-11-1', 'Description 1058', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1059, 10, '2014-12-1', 'Description 1059', null, now(), now(), 16, null, 1, null);
insert into Transactions values (1060, 10, '2014-1-1', 'Description 1060', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1061, 10, '2014-2-1', 'Description 1061', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1062, 10, '2014-3-1', 'Description 1062', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1063, 10, '2014-4-1', 'Description 1063', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1064, 10, '2014-5-1', 'Description 1064', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1065, 10, '2014-6-1', 'Description 1065', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1066, 10, '2014-7-1', 'Description 1066', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1067, 10, '2014-8-1', 'Description 1067', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1068, 10, '2014-9-1', 'Description 1068', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1069, 10, '2014-10-1', 'Description 1069', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1070, 10, '2014-11-1', 'Description 1070', null, now(), now(), 11, null, 1, null);
insert into Transactions values (1071, 10, '2014-12-1', 'Description 1071', null, now(), now(), 11, null, 1, null);



insert into Users values (3, 'Test', 'User 3', 'test.3@user.com', '', false, now(), now(), 100);

insert into Accounts values (100, 'Test Account that will be modified', 'MicrosoftMoney', true, true, now(), now(), 101, 3);