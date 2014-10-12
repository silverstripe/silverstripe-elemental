<?php

/**
 * @package elemental
 */
class ElementSocialIcons extends BaseElement {

	private static $db = array(
		'TwitterUser' => 'Varchar(200)',
		'FacebookLink' => 'Varchar(200)',
		'LinkedInLink' => 'Varchar(200)',
		'GooglePlusLink' => 'Varchar(200)'
	);

	private static $title = 'Social Icons';
}