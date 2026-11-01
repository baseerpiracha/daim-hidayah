# Our Little World — Daim & Hidayah

A complete, build-free family website. Open `index.html` in a modern browser to view it. Keep `index.html`, `style.css`, and `sc.js` beside each other. No installation or internet connection is needed for the design.

## Start with your photographs

The actual photographs were not attached to this request. All 59 original Daim filenames are preserved in `sc.js`, in their original order. Copy your existing photos into `images/` beside these three files. Keep capitalization and extensions exactly as written: `IMG_0001.JPG` is different from `img_0001.jpg` on GitHub Pages. Missing images show gentle placeholders and cannot be opened from the gallery.

Put Hidayah's real photos in `images/hidayah/`. Put sibling photos in `images/siblings/`. No photographs of either child have been generated or substituted.

## Edit the details

Open `sc.js` in Notepad or a code editor. Everything personal is inside `FAMILY_CONFIG` at the beginning. The rest of the script renders the page; leave it alone unless changing behavior.

- `children[0]` is Daim and `children[1]` is Hidayah.
- Edit `name`, `shortName`, `introduction`, `welcome`, and `letter` as needed.
- Birth dates use `YYYY-MM-DD`. Times use 24-hour `HH:MM`.
- Daim: 2024-01-20, 11:45, Pakistan; local zone is Asia/Karachi (PKT, UTC+05:00). His city was not provided: `[City to add]` remains visible until you fill `city` or hide birth places.
- Hidayah: 2026-10-15, 10:57, Jeddah, Saudi Arabia; local zone is Asia/Riyadh (AST, UTC+03:00).
- Fill `hospital`, `weight`, and `length` only if desired, such as `'3.2 kg'`. Empty optional fields disappear. Their privacy switches must also be enabled to display them.
- Age is calculated in each child's birth timezone using local calendar dates. Clearing `date` hides the date and age. Clearing `time` hides the time.
- Keep text inside quotes. Escape apostrophes in single-quoted strings, for example `'Papa\'s little star'`, or use double quotes.

## Add photos, captions, and dates

A photo can be a filename string or an object. Change an existing filename entry rather than adding a duplicate:

```js
photos: [
  { file: 'photo1.jpg', caption: 'A little moment to treasure',
    date: '2024-02-01', alt: 'Daim resting in Papa’s arms', focal: '50% 35%' },
  'photo2.jpg'
]
```

These values are editing examples, not recorded memories. Use your actual photo dates and descriptions. The array order is the display order. Photos preserve their proportions and use `contain` to avoid cropping faces. Optional `focal` sets object position; it also lets you adjust alignment if you later change the framing in CSS. Captions and dates are optional. `alt` should describe the actual image for screen readers.

To add Hidayah's photos, change her `photos: []` to, for example, `photos: ['your-real-filename.jpg']`. Her `imagePath` already points to `images/hidayah/`. Use the same pattern for `siblings.photos`. Their empty states disappear when entries are added.

## Choose main portraits

In each child's `portrait`, set `file` to a real filename within that child's image folder. Daim currently uses `photo1.jpg`. Hidayah's `file` is intentionally empty. The portrait is also used in the tab. Change `alt` to describe the photograph. If the file is missing, an elegant initial replaces it.

## Add real milestones

No milestones have been invented. The timeline is hidden until `milestones` contains entries. Use this format, replacing the example text and date with a real event:

```js
milestones: [
  { date: '2027-01-01', title: 'Your actual milestone',
    description: 'Write the memory in your own words.' }
]
```

Entries display in the order you write them. Omit the date if unknown.

## Privacy before publishing

At the top of `FAMILY_CONFIG`, change privacy switches to `false` to hide dates, age, exact times, places, hospital, or measurements. These are **display preferences, not password protection**. Values in `sc.js`, image filenames, captions, and uploaded photos remain readable by anyone who can access the files. Remove values from the configuration itself if they should not be public. A public Git repository also retains earlier versions; hiding a field does not remove its history.

Remove location metadata from photos before uploading. No image files were supplied, so no metadata has been removed as part of this delivery. On Windows, work on copies: right-click a photo → Properties → Details → Remove Properties and Personal Information → Create a copy with all possible properties removed. Inspect the resulting copy and confirm GPS/location fields are empty before uploading. Use a trusted metadata removal tool if your image format does not support this workflow. Check the visible photo and captions for addresses and other identifying details, too.

## Publish on GitHub Pages

1. Back up your existing website first.
2. In your existing GitHub repository, replace the old `index.html` and `sc.js`, and upload the new `style.css`. Put all three at the repository root. Upload your `images/` folders with their exact filenames. Upload the contents of this package, not an extra enclosing `our-little-world` directory.
3. Commit the changes to your publishing branch, usually `main`.
4. In the repository, open Settings → Pages. Under Build and deployment, select Deploy from a branch. Select `main` (or your actual publishing branch), select `/(root)`, then Save.
5. Wait for deployment to finish and open the URL shown in Pages settings. You do not need npm, a build command, or a separate JavaScript framework.
6. If your existing site already uses GitHub Actions for Pages, preserve that setup or deliberately switch to the branch method above.
7. If a photograph is missing, check the file location and exact filename capitalization. Refresh after the deployment completes.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

The supplied paths are relative, so they work both at the domain root and under a repository path. This delivery does not change your live GitHub repository; publish the files when you are ready.

## Controls and accessibility

Select a child with a click, Enter, or Space. While a tab is focused, Left/Right arrows switch children and Home/End select the first/last tab. Only the selected panel is displayed. The native modal photo viewer keeps focus inside, supports Escape, backdrop click, previous/next arrows, and horizontal swipes. Closing returns focus to the photo button. Reduced-motion settings disable transitions and entrance animation.

## Verification

JavaScript syntax, the 59-file manifest, calendar-date parsing, timezone boundaries, and age arithmetic were checked. Actual photos and their metadata could not be checked because no image files were attached. Browser visual and interaction checks were not run; check the finished album on your phone after adding the real photographs.
