
setwd("C:\\Users\\ISAAC\\Desktop\\Project\\GroupDecision\\server")

#mystring <- "Return from R!!!"
J2String <- input[[1]]

#J2String <- c("test","test2","test3")

library(mongolite)

#設定連結資料庫
mong <- mongo(collection = "users", db = "local", url = "mongodb://localhost")


for (i in 1:length(J2String)) {
  DM.str <- paste("DM",i,sep = "")
  acct.str <- J2String[i]
  query.str <- paste('{"username":"',acct.str,sep = "")
  query.str <- paste(query.str,'"}',sep = "")
  col_str <- c('C1u', 'C1v', 'C2u', 'C2v', 'C3u', 'C3v', 'C4u', 'C4v', 'C5u', 'C5v')
  data_str <- paste('D',letters[i],sep = "")
  ahp_cc_str <- paste('ahp_cc_',letters[i],sep = "")
 
  x<-assign(DM.str,mong$find(query.str))

  
  #decision matrices
  QA <- x$QA
  
  a <- matrix(QA[[1]], nrow=4, ncol=10,byrow = TRUE)  
  a <- as.data.frame(a)
  a <- a/10
  colnames(a) <-col_str 
  assign(data_str,a)
  
  #AHP
  QB <- x$QB
  col_str_b <- c('c1_c2','c1_c3','c1_c4','c1_c5','c2_c3','c2_c4','c2_c5','c3_c4','c3_c5','c4_c5')
  
  ahp <- diag(c(1,1,1,1,1));
  c1_c2 <- as.numeric(QB[[1]][1])
  c1_c3 <- as.numeric(QB[[1]][2])
  c1_c4 <- as.numeric(QB[[1]][3])
  c1_c5 <- as.numeric(QB[[1]][4])
  c2_c3 <- as.numeric(QB[[1]][5])
  c2_c4 <- as.numeric(QB[[1]][6])
  c2_c5 <- as.numeric(QB[[1]][7])
  c3_c4 <- as.numeric(QB[[1]][8])
  c3_c5 <- as.numeric(QB[[1]][9])
  c4_c5 <- as.numeric(QB[[1]][10])
  ahp[1,2] <- c1_c2;
  ahp[1,3] <- c1_c3;
  ahp[2,3] <- c2_c3;
  ahp[1,4] <- c1_c4;
  ahp[2,4] <- c2_c4;
  ahp[3,4] <- c3_c4;
  ahp[1,5] <- c1_c5;
  ahp[2,5] <- c2_c5;
  ahp[3,5] <- c3_c5;
  ahp[4,5] <- c4_c5;
  ahp[2,1] <- c1_c2^-1;
  ahp[3,1] <- c1_c3^-1;
  ahp[4,1] <- c1_c4^-1;
  ahp[5,1] <- c1_c5^-1;
  ahp[3,2] <- c2_c3^-1;
  ahp[4,2] <- c2_c4^-1;
  ahp[5,2] <- c2_c5^-1;
  ahp[4,3] <- c3_c4^-1;
  ahp[5,3] <- c3_c5^-1;
  ahp[5,4] <- c4_c5^-1;
  
  ahp_colsum <- colSums(ahp);
  ahp_c1 <- ahp[,1]/ahp_colsum[1];
  ahp_c2 <- ahp[,2]/ahp_colsum[2];
  ahp_c3 <- ahp[,3]/ahp_colsum[3];
  ahp_c4 <- ahp[,4]/ahp_colsum[4];
  ahp_c5 <- ahp[,5]/ahp_colsum[5];
  ahp_cc <- cbind(ahp_c1, ahp_c2, ahp_c3, ahp_c4, ahp_c5);
  assign(ahp_cc_str,ahp_cc)
  
}



#score matrices
Sa <- c(Da[,1]-Da[,2], Da[,3]-Da[,4], Da[,5]-Da[,6], Da[,7]-Da[,8], Da[,9]-Da[,10]);
Sa <- matrix(Sa, nrow=4, ncol=5);
Sb <- c(Db[,1]-Db[,2], Db[,3]-Db[,4], Db[,5]-Db[,6], Db[,7]-Db[,8], Db[,9]-Db[,10]);
Sb <- matrix(Sb, nrow=4, ncol=5);
Sc <- c(Dc[,1]-Dc[,2], Dc[,3]-Dc[,4], Dc[,5]-Dc[,6], Dc[,7]-Dc[,8], Dc[,9]-Dc[,10]);
Sc <- matrix(Sc, nrow=4, ncol=5);



#S_star
S_star <- (Sa+Sb+Sc)/3;

#collective correlation coefficients
#dividend_ea1 <- sqrt(sum(Sa[1,]^2))*sqrt(sum(S_star[1,]^2))
#divisor_ea1 <- sum(Sa[1,]*S_star[1,])
#divided_ea1 <- divisor_ea1/dividend_ea1
divided_ea1 <- (sum(Sa[1,]*S_star[1,]))/(sqrt(sum(Sa[1,]^2))*sqrt(sum(S_star[1,]^2)));
divided_ea2 <- (sum(Sa[2,]*S_star[2,]))/(sqrt(sum(Sa[2,]^2))*sqrt(sum(S_star[2,]^2)));
divided_ea3 <- (sum(Sa[3,]*S_star[3,]))/(sqrt(sum(Sa[3,]^2))*sqrt(sum(S_star[3,]^2)));
divided_ea4 <- (sum(Sa[4,]*S_star[4,]))/(sqrt(sum(Sa[4,]^2))*sqrt(sum(S_star[4,]^2)));
divided_eb1 <- (sum(Sb[1,]*S_star[1,]))/(sqrt(sum(Sb[1,]^2))*sqrt(sum(S_star[1,]^2)));
divided_eb2 <- (sum(Sb[2,]*S_star[2,]))/(sqrt(sum(Sb[2,]^2))*sqrt(sum(S_star[2,]^2)));
divided_eb3 <- (sum(Sb[3,]*S_star[3,]))/(sqrt(sum(Sb[3,]^2))*sqrt(sum(S_star[3,]^2)));
divided_eb4 <- (sum(Sb[4,]*S_star[4,]))/(sqrt(sum(Sb[4,]^2))*sqrt(sum(S_star[4,]^2)));
divided_ec1 <- (sum(Sc[1,]*S_star[1,]))/(sqrt(sum(Sc[1,]^2))*sqrt(sum(S_star[1,]^2)));
divided_ec2 <- (sum(Sc[2,]*S_star[2,]))/(sqrt(sum(Sc[2,]^2))*sqrt(sum(S_star[2,]^2)));
divided_ec3 <- (sum(Sc[3,]*S_star[3,]))/(sqrt(sum(Sc[3,]^2))*sqrt(sum(S_star[3,]^2)));
divided_ec4 <- (sum(Sc[4,]*S_star[4,]))/(sqrt(sum(Sc[4,]^2))*sqrt(sum(S_star[4,]^2)));
Ea <- sum(divided_ea1, divided_ea2, divided_ea3, divided_ea4);
Eb <- sum(divided_eb1, divided_eb2, divided_eb3, divided_eb4);
Ec <- sum(divided_ec1, divided_ec2, divided_ec3, divided_ec4);

#norm ea, eb, ec
norm_a <- Ea/sum(Ea, Eb, Ec);
norm_b <- Eb/sum(Ea, Eb, Ec);
norm_c <- Ec/sum(Ea, Eb, Ec);

S <- Sa*norm_a + Sb*norm_b + Sc*norm_c


#AHP
ahp_cc_a_mean <- rowMeans(ahp_cc_a)
ahp_cc_b_mean <- rowMeans(ahp_cc_b)
ahp_cc_c_mean <- rowMeans(ahp_cc_c)

ahp_cc_mean <-rbind(ahp_cc_a_mean,ahp_cc_b_mean,ahp_cc_c_mean)

w_star <- colMeans(ahp_cc_mean);


#saw
saw <- S%*%w_star;

write.table(saw, file = "saw.csv")
sss <- as.character(saw)
dict <- vector(mode="list", length=4)
names(dict) <- c("alt1", "alt2", "alt3", "alt4")
dict[[1]] <- saw[1]*100
dict[[2]] <- saw[2]*100
dict[[3]] <- saw[3]*100
dict[[4]] <- saw[4]*100
return(dict)


