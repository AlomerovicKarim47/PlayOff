CREATE OR REPLACE FUNCTION backup_zahtjevi_mec()
RETURNS TRIGGER AS $backup$
BEGIN
	INSERT INTO public."BackupZahtjeviMec"( sadrzaj, vidjenost, "timPosiljaoc", "timPrimaoc", "vrijemeOdrzavanja", mjesto, status, "createdAt", "updatedAt")
	VALUES(NEW.sadrzaj,NEW.vidjenost,NEW."timPosiljaoc",NEW."timPrimaoc",NEW."vrijemeOdrzavanja",NEW.mjesto,NEW.status,NEW."createdAt",NEW."updatedAt");
	RETURN NEW;
END;
$backup$
LANGUAGE plpgsql;

CREATE TRIGGER backup_zahtjevi_mec
AFTER INSERT ON public."ZahtjevTims"
FOR EACH ROW EXECUTE PROCEDURE backup_zahtjevi_mec();

CREATE OR REPLACE FUNCTION backup_zahtjevi_tim()
RETURNS TRIGGER AS $backuptim$
BEGIN
	INSERT INTO public."BackupZahtjeviTim"(
	sadrzaj, vidjenost, posiljaoc, primaoc, tim, "createdAt", "updatedAt")
	VALUES (NEW.sadrzaj, NEW.vidjenost, NEW.posiljaoc, NEW.primaoc, NEW.tim, NEW."createdAt",NEW."updatedAt");
	RETURN NEW;
END;
$backuptim$
LANGUAGE plpgsql;

CREATE TRIGGER backup_zahtjevi_tim
AFTER INSERT ON public."ZahtjevTims"
FOR EACH ROW EXECUTE PROCEDURE backup_zahtjevi_tim();

	CREATE OR REPLACE FUNCTION backup_zahtjevi_mecbeztimova()
RETURNS TRIGGER AS $backuptim$
BEGIN
	INSERT INTO public."BackupZahtjeviMecBezTimova"(
		primaoc, posiljaoc, vidjenost, "vrijemeOdrzavanja", mjesto, status, sport, mec, "createdAt", "updatedAt")
	VALUES (NEW.primaoc, NEW.posiljaoc,NEW.vidjenost, NEW."vrijemeOdrzavanja", NEW.mjesto, NEW.status,NEW.sport,NEW.mec ,NEW."createdAt",NEW."updatedAt");
	RETURN NEW;
END;
$backuptim$
LANGUAGE plpgsql;

CREATE TRIGGER backup_zahtjevi_mecbeztimova
AFTER INSERT ON public."ZahtjevMecBezTimovas"
FOR EACH ROW EXECUTE PROCEDURE backup_zahtjevi_mecbeztimova();
