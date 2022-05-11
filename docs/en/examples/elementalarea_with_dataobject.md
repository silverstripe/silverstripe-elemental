# Using ElementalArea with DataObject

## Creating Model and adding ElementalArea

In this example the class `BlogPost` will be created, it will extend the `DataObject` class. Also a new `BlogPost` Admin section will be created in the Admin panel where CMS users can manage the `BlogPost` objects.

Let's look at an example:

**app/src/Admins/BlogPostsAdmin.php**

```php
<?php

namespace App\Admins;

use App\Models\BlogPost;
use SilverStripe\Admin\ModelAdmin;

class BlogPostsAdmin extends ModelAdmin
{
    private static string $url_segment = 'blog-posts-admin';

    private static string $menu_title = 'Blog Posts';

    private static string $menu_icon_class = 'font-icon-block-banner';

    private static array $managed_models = [
        BlogPost::class,
    ];
}
```

`$managed_models` - this static variable connects `BlogPostAdmin` with `BlogPost`, which will be created in the following code.\
When you create a `DataObject` you should define the connection between your `DataObject` and `ElementalArea` by adding `$has_one` relationship.\
In this example `BlogPost` will have one `ElementalArea`.

**app/src/Models/BlogPost.php**

```php
<?php

namespace App\Models;

use App\Admins\BlogPostsAdmin;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Control\Controller;
use SilverStripe\ORM\DataObject;
use SilverStripe\Versioned\Versioned;

class BlogPost extends DataObject
{
    private static string $table_name = 'BlogPost';

    private static $has_one = [
        'ElementalArea' => ElementalArea::class,
    ];

    private static $owns = ['ElementalArea'];

    // ...
}
 ```

If you are using `ElementalArea` together with `DataObject`, it is important to define the `CMSEditLink()` method in the class.\
`BaseElement::CMSEditLink()` relies on a valid CMS link being available in the parent `DataObject` - in this case, `BlogPost`. It is used to navigate directly to the editing section of the particular element.\
***Note:*** For nested `GridField`s this method can get more complicated. Similarly, if your class is used in multiple admins, you will have to choose one to be the canonical admin section for the purposes of this method. This example only shows the simplest case, where the `BlogPost` class is used directly in `BlogPostsAdmin`.

```php
// ...

class BlogPost extends DataObject
{
    // ...

    public function CMSEditLink()
    {
        // In this example we use BlogPostsAdmin class as Controller
        $admin = BlogPostsAdmin::singleton();

        // Makes link more readable. Instead App\Models\ BlogPost, we get App-Models-BlogPost
        $sanitisedClassname = str_replace('\\', '-', $this->ClassName);

        // Returns link to editing section with elements
        return Controller::join_links(
            $admin->Link($sanitisedClassname),
            'EditForm/field/',
            $sanitisedClassname,
            'item',
            $this->ID,
        );
    }

    // ...
}

```

And finally, add `ElementalAreasExtension` to the `DataObject`

**app/_config/elemental.yml**

```yml
App\Models\BlogPost:
  extensions: 
    - DNADesign\Elemental\Extensions\ElementalAreasExtension
```

## Related Documentation

* [Preview](https://docs.silverstripe.org/en/4/developer_guides/customising_the_admin_interface/preview/)
(note that this requires at least `silverstripe/admin` 4.11.0 and `dnadesign/silverstripe-elemental` 4.9.0)