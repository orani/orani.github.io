
# b52 Aineisto löytyy Work –kansiossa

library(foreign)

dat <- iris
# Ovatko muuttujat oikeaa tietotyyppiä?
# Erit.: euromääräiset int/numeric tms.?

str(dat)

# Lasketaan tukien osuus käyttötuloista
dat$tukien_osuus <- (dat$TTYOTPR+dat$yatuki+dat$VARS_yhteensa)/dat$kturaha

# Miltä näyttää?
head(dat[,c('TTYOTPR','yatuki','VARS_yhteensa','kturaha','tukien_osuus')])

# Porukat: Työttömyysturva-ryhmä

dat$tyottomyysturva <- ifelse(dat$tukien_osuus>=0.5 & dat$tt_kuukausia>=10 & datTTYOTPR>dat$VARS_yhteensa,1,0)
table(dat$tyottomyysturva,dat$vuosi)

# Porukat: Tulottomat

dat$tulottomat <- ifelse(dat$tukien_osuus>=0.5 & dat$tt_kuukausia>=10 & datTTYOTPR<=dat$VARS_yhteensa,1,0)
table(dat$tulottomat,dat$vuosi)

# Jommassa kummassa

dat$porukoissa <- ifelse(dat$tyottomyysturva+dat$tulottomat>0,1,0)

# Vuosien 2007,2008 & 2013 porukat

d07 <- subset(dat,vuosi==2007)
d08 <- subset(dat,vuosi==2008)
d13 <- subset(dat,vuosi==2013)

# Valmistellaan -08 & -13 -aineistot

d08$toissa08 <- ifelse(d08$ptoim1=='11',1,0)
d08$elakkeella08 <- ifelse(d08$ptoim1 %in% c('24','29'),1,0)

#[24+29] Eläkeläiset
d13$toissa13 <- ifelse(d13$ptoim1=='11',1,0)
d13$elakkeella13 <- ifelse(d13$ptoim1 %in% c('24','29'),1,0)

# Varmistetaan että meni oikein
table(d08$ptoim1,d08$elakkeella08)

d08 <- d08[,c('tutnro','toissa08','elakkeella08')]
d08 <- d08[,c('tutnro','toissa13','elakkeella13')]


# Yhdistetään vuoden 2007 tietoon vuosien -08 & -13 pääasiallinen toiminta

d07 <- merge(d07,d08,by='tutnro',all.x=T)
d07 <- merge(d07,d13,by='tutnro',all.x=T)

# Pelkät porukat

d07 <- subset(d07,porukoissa==1)

# Porukoista työllistyneet -08
tbl1 <- data.frame(table(d07$ika,d07$toissa08))

# Näyttääkö hyvältä?
head(tbl1)

# Porukoista työllistyneet -13
tbl2 <- data.frame(table(d07$ika,d07$toissa13))

# Porukoista eläkkeellä -08
tbl3 <- data.frame(table(d07$ika,d07$elakkeella08))

# Porukoista eläkkeellä -13
tbl4 <- data.frame(table(d07$ika,d07$elakkeella13))

# Kirjoitetaan levylle(?)

write.table(tbl1,file='porukoista_tyollistyneet_08.csv',sep=";",col.names=T,dec=",",row.names=F)
write.table(tbl2,file='porukoista_tyollistyneet_13.csv',sep=";",col.names=T,dec=",",row.names=F)
write.table(tbl3,file='porukoista_elakkeella_08.csv',sep=";",col.names=T,dec=",",row.names=F)
write.table(tbl4,file='porukoista_elakkeella_13.csv',sep=";",col.names=T,dec=",",row.names=F)


