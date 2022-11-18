package com.github.Deyvs.dsmeta.service;

import com.github.Deyvs.dsmeta.entities.Sale;
import com.github.Deyvs.dsmeta.repository.SaleRepository;
import com.twilio.Twilio;
import com.twilio.type.PhoneNumber;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String twilioAccountSid;

    @Value("${twilio.auth.token}")
    private String twilioAuthToken;

    @Value("${twilio.phone.from}")
    private String twilioPhoneFrom;

    @Value("${twilio.phone.to}")
    private String twilioPhoneTo;

    @Autowired
    private SaleRepository saleRepository;
    public void sendMessage(Long saleId ) {

        Sale sale = saleRepository.findById(saleId).get();

        String date = sale.getDate().getMonthValue() + "/" + sale.getDate().getYear();
        String amount = String.format("%.2f", sale.getAmount());

        String msg = "O vendedor " + sale.getSellerName() +
                    " foi destaque em " + date +
                    " com um valor total de R$ " + amount;

        Twilio.init(twilioAccountSid, twilioAuthToken);

        PhoneNumber to = new PhoneNumber(twilioPhoneTo);
        PhoneNumber from = new PhoneNumber(twilioPhoneFrom);

        Message message = Message.creator(to, from, msg).create();

        System.out.println(message.getSid());;
    }
}
