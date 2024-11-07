import { Component, ElementRef, OnInit } from '@angular/core';

declare let SamsungPay: {
  notify(paymentResult: { status: string; provider: string }): any;
  loadPaymentSheet(
    paymentMethods: any,
    transactionDetail: {
      orderNumber: string;
      merchant: { name: string; url: string; id: string };
      amount: { option: string; currency: string; total: number };
    }
  ): any;
  createButton(arg0: { onClick: any; buttonStyle: string; type: string }): any;
  isReadyToPay(paymentMethods: {
    version: string;
    serviceId: string;
    protocol: string;
    allowedBrands: string[];
  }): Promise<SamsungPayResponse>;
  PaymentClient: any;
};

interface SamsungPayResponse {
  result: string;
}

interface PaymentMethods {
  version: string;
  serviceId: string;
  protocol: string;
  allowedBrands: string[];
}

@Component({
  selector: 'app-samsung-pay',
  standalone: true,
  imports: [],
  templateUrl: './samsung-pay.component.html',
  styleUrl: './samsung-pay.component.css',
})
export class SamsungPayComponent implements OnInit {
  public samsungPayClient!: typeof SamsungPay;
  public paymentMethods!: PaymentMethods;

  constructor(private readonly elementRef: ElementRef) {}

  async ngOnInit(): Promise<void> {
    this.loadScipt();
    this.doConnect();
  }

  async loadScipt(): Promise<void> {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://img.mpay.samsung.com/gsmpi/sdk/samsungpay_web_sdk.js';
    this.elementRef.nativeElement.appendChild(script);
  }

  async delay(): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, 1000);
    });
  }

  async doConnect(): Promise<void> {
    await this.delay();

    this.samsungPayClient = new SamsungPay.PaymentClient({
      environment: 'STAGE',
    });

    this.paymentMethods = {
      version: '2',
      serviceId: 'dcc1cbb25d6a470bb42926',
      protocol: 'PROTOCOL_3DS',
      allowedBrands: ['visa', 'mastercard'],
    };

    this.samsungPayClient
      .isReadyToPay(this.paymentMethods)
      .then((response) => {
        if (response.result) {
          this.createAndAddButton();
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  createAndAddButton() {
    const samsungPayButton = this.samsungPayClient.createButton({
      onClick: () => this.onSamsungPayButtonClicked(),
      buttonStyle: 'black',
      type: 'buy',
    });

    document
      .getElementById('samsungpay-container')
      ?.appendChild(samsungPayButton);
  }

  onSamsungPayButtonClicked() {
    let transactionDetail = {
      orderNumber: 'DSTRF345789dsgTY',
      merchant: {
        name: 'Virtual Shop',
        url: 'virtualshop.com',
        id: 'xn7qfnd',
      },
      amount: {
        option: 'FORMAT_TOTAL_ESTIMATED_AMOUNT',
        currency: 'USD',
        total: 300,
      },
    };

    this.loadSheet(transactionDetail);

    // client?.loadPaymentSheet(this.paymentMethods, transactionDetail).then((paymentCredential: any) => {
    //     console.log('paymentCredential: ', paymentCredential);
    //     const paymentResult = {
    //       status: 'CHARGED',
    //       provider: 'PG Name',
    //     };
    //     client.notify(paymentResult);
    //   })
    //   .catch(function (error: any) {
    //     console.log('error: ', error);
    //   });
  }

  loadSheet(transactionDetail: any) {
    this.samsungPayClient
      .loadPaymentSheet(this.paymentMethods, transactionDetail)
      .then((paymentCredential: any) => {
        console.log('paymentCredential: ', paymentCredential);
        const paymentResult = {
          status: 'CHARGED',
          provider: 'PG Name',
        };
        this.samsungPayClient.notify(paymentResult);
      })
      .catch(function (error: any) {
        console.log('error: ', error);
      });
  }
}
