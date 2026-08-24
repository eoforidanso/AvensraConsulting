import Script from "next/script";
import { env } from "@/lib/env";

/**
 * Analytics and marketing tags.
 *
 * Each tag is rendered only when its ID is present, so the site ships with
 * nothing loading until Avensra provides the accounts. GA4 is the Phase 1
 * requirement; Meta Pixel and the LinkedIn Insight Tag are wired and ready
 * but stay dormant until an ID is set — that is the "technical readiness"
 * the brief asks for, without loading third-party trackers by default.
 */
export function Analytics() {
  return (
    <>
      {env.ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${env.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${env.ga4Id}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {env.metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${env.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {env.linkedInPartnerId ? (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${env.linkedInPartnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      ) : null}
    </>
  );
}

/**
 * Fires a conversion event on all configured platforms.
 * Called from the order confirmation page after a verified purchase.
 */
export function ConversionScript({
  event,
  value,
  currency = "USD",
  id,
}: {
  event: string;
  value?: number;
  currency?: string;
  id?: string;
}) {
  return (
    <Script id={`conversion-${event}`} strategy="afterInteractive">
      {`
        if (typeof window.gtag === 'function') {
          window.gtag('event', ${JSON.stringify(event)}, {
            currency: ${JSON.stringify(currency)},
            value: ${JSON.stringify(value ?? 0)},
            transaction_id: ${JSON.stringify(id ?? "")}
          });
        }
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Purchase', {
            currency: ${JSON.stringify(currency)},
            value: ${JSON.stringify(value ?? 0)}
          });
        }
        if (typeof window.lintrk === 'function') {
          window.lintrk('track', { conversion_id: ${JSON.stringify(id ?? "")} });
        }
      `}
    </Script>
  );
}
