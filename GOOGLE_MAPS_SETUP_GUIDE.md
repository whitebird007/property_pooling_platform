# Google Maps API Setup Guide for Replit Deployment

This guide walks you through setting up Google Maps API for the PropertyPool platform on Replit. Since you're moving away from Manus, you'll need your own Google Maps API key.

## Table of Contents

1. [Create Google Cloud Project](#create-google-cloud-project)
2. [Enable Google Maps APIs](#enable-google-maps-apis)
3. [Generate API Key](#generate-api-key)
4. [Restrict API Key](#restrict-api-key)
5. [Add to Replit](#add-to-replit)
6. [Test the Integration](#test-the-integration)
7. [Troubleshooting](#troubleshooting)
8. [Cost Estimation](#cost-estimation)

---

## Create Google Cloud Project

### Step 1: Go to Google Cloud Console

1. Open https://console.cloud.google.com
2. Sign in with your Google account (create one if needed)
3. You should see the Google Cloud Console dashboard

### Step 2: Create a New Project

1. Click the **Project** dropdown at the top (shows "My First Project" or similar)
2. Click **NEW PROJECT**
3. Fill in the project details:
   - **Project name**: `PropertyPool Maps` (or any name you prefer)
   - **Organization**: Leave blank (or select if you have one)
   - **Location**: Leave as default
4. Click **CREATE**
5. Wait for the project to be created (takes 30 seconds to 1 minute)

### Step 3: Select Your Project

1. Once created, click the **Project** dropdown again
2. Find and click on `PropertyPool Maps` to select it
3. You should see it in the top navigation bar

---

## Enable Google Maps APIs

### Step 1: Go to APIs & Services

1. In the left sidebar, click **APIs & Services**
2. Click **Library**

### Step 2: Enable Maps JavaScript API

1. Search for `Maps JavaScript API` in the search box
2. Click on the result
3. Click the blue **ENABLE** button
4. Wait for it to enable (takes a few seconds)

### Step 3: Enable Additional APIs

Repeat the process for these APIs (your PropertyPool uses them):

1. **Places API**
   - Search: `Places API`
   - Click **ENABLE**

2. **Geocoding API**
   - Search: `Geocoding API`
   - Click **ENABLE**

3. **Directions API**
   - Search: `Directions API`
   - Click **ENABLE**

4. **Distance Matrix API** (optional, for distance calculations)
   - Search: `Distance Matrix API`
   - Click **ENABLE**

**Tip**: You can enable all at once by searching for "Maps" and enabling all Maps-related APIs.

---

## Generate API Key

### Step 1: Go to Credentials

1. In the left sidebar, click **APIs & Services**
2. Click **Credentials**

### Step 2: Create API Key

1. Click the blue **+ CREATE CREDENTIALS** button at the top
2. Select **API Key** from the dropdown
3. A dialog will appear showing your new API key
4. **Copy this key** - you'll need it for Replit
5. Click **CLOSE**

**Your API Key looks like**: `AIzaSyD1234567890abcdefghijklmnopqrst`

---

## Restrict API Key

**IMPORTANT**: Restrict your API key to prevent unauthorized use and reduce costs.

### Step 1: Find Your API Key

1. Go to **APIs & Services** → **Credentials**
2. Under "API keys" section, you should see your newly created key
3. Click on it to open the key details

### Step 2: Set Application Restrictions

1. Scroll to **Application restrictions**
2. Select **HTTP referrers (web sites)**
3. Click **Add an item**
4. Enter your Replit domain:
   - If your Replit project is named `propertypool`, your domain is: `https://propertypool.replit.dev`
   - Or use the exact domain shown in your Replit project
5. You can also add `localhost:3000` for local testing:
   - `http://localhost:3000`
   - `http://localhost:3000/*`

### Step 3: Set API Restrictions

1. Scroll to **API restrictions**
2. Select **Restrict key**
3. Check only these APIs:
   - ✓ Maps JavaScript API
   - ✓ Places API
   - ✓ Geocoding API
   - ✓ Directions API
4. Click **SAVE**

**Why restrict?**
- Prevents unauthorized use of your API key
- Reduces costs by blocking abuse
- Keeps your key secure

---

## Add to Replit

### Step 1: Copy Your API Key

1. Go back to **APIs & Services** → **Credentials**
2. Click on your API key to view it
3. Copy the key value (the long string starting with `AIzaSy...`)

### Step 2: Add to Replit Secrets

1. Open your Replit project
2. Click the **Secrets** icon (lock icon) in the left sidebar
3. Click **Add new secret**
4. Fill in:
   - **Key**: `VITE_GOOGLE_MAPS_API_KEY`
   - **Value**: Paste your API key here
5. Click **Add Secret**

### Step 3: Verify in Environment

1. The secret is now available as `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`
2. The Map component will automatically use it

---

## Test the Integration

### Step 1: Update Map Component (if not already done)

The Map component needs to use your direct API key instead of Manus proxy. Check if it's already updated:

1. Open `client/src/components/Map.tsx`
2. Look for line 89-93
3. It should look like:

```javascript
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAPS_API_URL = "https://maps.googleapis.com/maps/api/js";

function loadMapScript() {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = `${MAPS_API_URL}?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    // ... rest of code
  });
}
```

If it still uses Manus proxy, the component will be updated automatically.

### Step 2: Test in Browser

1. Start your Replit project: Click **Run**
2. Wait for the dev server to start
3. Go to a page with a map:
   - **Property Detail Page**: `/properties/1` (shows property location)
   - **Area Guides**: `/area-guides` (shows area maps)
   - **Admin Property Management**: `/admin/property-management/1` (shows location map)
4. The map should load without errors

### Step 3: Check Browser Console

1. Open browser **Developer Tools** (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Look for any errors related to Google Maps
4. If you see errors, check the troubleshooting section below

### Step 4: Test Map Features

1. **Zoom in/out** - Use mouse wheel or zoom controls
2. **Pan** - Click and drag the map
3. **Search** - If available, search for a location
4. **Markers** - Should see property location markers
5. **Street View** - Click the Street View button (if enabled)

---

## Troubleshooting

### Issue: "Google Maps API key error"

**Error Message**: `Google Maps API error: RefererNotAllowed`

**Solution**:
1. Go to Google Cloud Console
2. **APIs & Services** → **Credentials**
3. Click your API key
4. Scroll to **Application restrictions**
5. Make sure your Replit domain is added
6. If using custom domain, add that instead
7. Wait 5-10 minutes for changes to propagate

### Issue: "Maps JavaScript API not loaded"

**Error Message**: `Failed to load Google Maps script` or `google is not defined`

**Solution**:
1. Check that `VITE_GOOGLE_MAPS_API_KEY` is set in Replit Secrets
2. Verify the API key is correct (no extra spaces)
3. Ensure Maps JavaScript API is enabled in Google Cloud Console
4. Check browser console for specific error messages
5. Try restarting your Replit project

### Issue: "Places API not available"

**Error Message**: `google.maps.places is undefined`

**Solution**:
1. Go to Google Cloud Console
2. **APIs & Services** → **Library**
3. Search for "Places API"
4. Click **ENABLE**
5. Wait 5 minutes for it to activate
6. Restart your Replit project

### Issue: "Geocoding API not available"

**Error Message**: `google.maps.Geocoder is undefined`

**Solution**:
1. Go to Google Cloud Console
2. **APIs & Services** → **Library**
3. Search for "Geocoding API"
4. Click **ENABLE**
5. Wait 5 minutes for it to activate
6. Restart your Replit project

### Issue: "API key quota exceeded"

**Error Message**: `You have exceeded your quota` or `Quota exceeded`

**Solution**:
1. Go to Google Cloud Console
2. **APIs & Services** → **Quotas**
3. Find "Maps JavaScript API"
4. Check current usage vs. quota
5. If needed, increase quota by clicking the quota and requesting increase
6. See **Cost Estimation** section below

### Issue: "CORS error in browser console"

**Error Message**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. This usually means the API key is not properly restricted
2. Go to Google Cloud Console
3. **APIs & Services** → **Credentials**
4. Click your API key
5. Under **Application restrictions**, select **HTTP referrers (web sites)**
6. Make sure your Replit domain is listed
7. Save and wait 5-10 minutes

### Issue: "Map not displaying on specific page"

**Solution**:
1. Check that the page component is using the `MapView` component correctly
2. Verify the component receives `initialCenter` and `initialZoom` props
3. Check browser console for JavaScript errors
4. Ensure the map container has a valid height (should be at least 300px)

---

## Cost Estimation

### Free Tier

Google Maps API has a generous free tier:

| API | Free Quota | Cost After |
|-----|-----------|-----------|
| Maps JavaScript API | 28,000 loads/month | $7 per 1,000 loads |
| Places API | 25,000 requests/month | $7 per 1,000 requests |
| Geocoding API | 25,000 requests/month | $5 per 1,000 requests |
| Directions API | 25,000 requests/month | $5 per 1,000 requests |

### Cost Calculation Example

For PropertyPool with ~1,000 active users per month:

- **Maps JavaScript API**: ~5,000 loads = FREE (under 28,000)
- **Places API**: ~500 requests = FREE (under 25,000)
- **Geocoding API**: ~300 requests = FREE (under 25,000)
- **Directions API**: ~200 requests = FREE (under 25,000)

**Total Monthly Cost**: $0 (within free tier)

### How to Monitor Costs

1. Go to Google Cloud Console
2. Click **Billing** in the left sidebar
3. You'll see:
   - Current month's charges
   - Usage by API
   - Forecast for the month
4. Set up billing alerts:
   - Click **Budgets and alerts**
   - Click **+ CREATE BUDGET**
   - Set budget to $10/month
   - You'll get email alerts if you approach the limit

### Cost Optimization Tips

1. **Cache results** - Store geocoding results in your database
2. **Batch requests** - Combine multiple requests into one
3. **Use appropriate zoom levels** - Reduces tile requests
4. **Lazy load maps** - Only load maps when user needs them
5. **Set API restrictions** - Prevents unauthorized usage

---

## Next Steps

After setting up Google Maps:

1. ✅ Verify maps load on all pages
2. ✅ Test location search functionality
3. ✅ Test property location display
4. ✅ Monitor usage in Google Cloud Console
5. ✅ Set up billing alerts
6. ✅ Deploy to Replit

---

## Quick Reference

| Item | Value |
|------|-------|
| Google Cloud Console | https://console.cloud.google.com |
| Replit Secrets Key | `VITE_GOOGLE_MAPS_API_KEY` |
| Map Component | `client/src/components/Map.tsx` |
| Free Quota | 28,000 Maps loads/month |
| Cost per 1,000 | $7 (Maps), $5 (Geocoding/Directions) |
| Setup Time | ~10 minutes |

---

## Support Resources

- **Google Maps Documentation**: https://developers.google.com/maps/documentation
- **Google Cloud Console**: https://console.cloud.google.com
- **API Quotas & Limits**: https://developers.google.com/maps/billing-and-pricing/pricing
- **Replit Secrets**: https://docs.replit.com/programming-experience/managing-secrets
- **PropertyPool Map Component**: `client/src/components/Map.tsx`

---

## Checklist

- [ ] Google Cloud project created
- [ ] Maps JavaScript API enabled
- [ ] Places API enabled
- [ ] Geocoding API enabled
- [ ] Directions API enabled
- [ ] API key generated
- [ ] API key restricted to HTTP referrers
- [ ] API key restricted to Maps APIs only
- [ ] API key added to Replit Secrets
- [ ] Map component updated (if needed)
- [ ] Maps tested on property detail page
- [ ] Maps tested on area guides page
- [ ] No console errors
- [ ] Billing alerts set up
- [ ] Ready for production deployment

---

**Last Updated**: December 31, 2025
**Version**: 1.0.0
**Platform**: Replit + Google Cloud
